module maha_addr::VeriFind {
    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use std::string::String;

    /// Struct representing a missing person case
    struct MissingPersonCase has store, key {
        case_hash: String,        // Encrypted hash of case details
        reward_pool: u64,         // Total reward amount for tips
        is_active: bool,          // Case status
        tip_count: u64,           // Number of tips received
    }

    /// Struct representing a tip submission
    struct TipSubmission has store, key {
        case_owner: address,      // Address of the case owner
        tip_hash: String,         // Hash of tip details (location, photo, etc.)
        reward_claimed: bool,     // Whether tip reward was claimed
        timestamp: u64,           // When tip was submitted
    }

    /// Function to register a new missing person case
    public fun register_case(
        case_owner: &signer, 
        case_hash: String, 
        initial_reward: u64
    ) {
        let case = MissingPersonCase {
            case_hash,
            reward_pool: initial_reward,
            is_active: true,
            tip_count: 0,
        };
        
        // Transfer initial reward to contract
        if (initial_reward > 0) {
            let reward_coins = coin::withdraw<AptosCoin>(case_owner, initial_reward);
            coin::deposit<AptosCoin>(signer::address_of(case_owner), reward_coins);
        };
        
        move_to(case_owner, case);
    }

    /// Function to submit a verified tip for a missing person case
    public fun submit_tip(
        tip_submitter: &signer,
        case_owner_address: address,
        tip_hash: String,
        current_timestamp: u64
    ) acquires MissingPersonCase {
        let case = borrow_global_mut<MissingPersonCase>(case_owner_address);
        
        // Only accept tips for active cases
        assert!(case.is_active, 1);
        
        // Create tip submission record
        let tip = TipSubmission {
            case_owner: case_owner_address,
            tip_hash,
            reward_claimed: false,
            timestamp: current_timestamp,
        };
        
        // Increment tip counter
        case.tip_count = case.tip_count + 1;
        
        move_to(tip_submitter, tip);
    }
}