module maha_addr::VeriFind {
    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use std::string::String;

    struct MissingPersonCase has store, key {
        case_hash: String,        
        reward_pool: u64,         
        is_active: bool,          
        tip_count: u64,           
    }

    
    struct TipSubmission has store, key {
        case_owner: address,     
        tip_hash: String,         
        reward_claimed: bool,     
        timestamp: u64,           
    }

    
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
        
       
        if (initial_reward > 0) {
            let reward_coins = coin::withdraw<AptosCoin>(case_owner, initial_reward);
            coin::deposit<AptosCoin>(signer::address_of(case_owner), reward_coins);
        };
        
        move_to(case_owner, case);
    }

    
    public fun submit_tip(
        tip_submitter: &signer,
        case_owner_address: address,
        tip_hash: String,
        current_timestamp: u64
    ) acquires MissingPersonCase {
        let case = borrow_global_mut<MissingPersonCase>(case_owner_address);
        
       
        assert!(case.is_active, 1);
        
       
        let tip = TipSubmission {
            case_owner: case_owner_address,
            tip_hash,
            reward_claimed: false,
            timestamp: current_timestamp,
        };
        
        
        case.tip_count = case.tip_count + 1;
        
        move_to(tip_submitter, tip);
    }

}
