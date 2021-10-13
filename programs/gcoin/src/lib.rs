use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod gcoin {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, bump: u8, seconds: u64) -> ProgramResult {
        let global_state = &mut ctx.accounts.global_state;
        global_state.bump = bump;
        global_state.seconds = seconds;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct Initialize<'info> {
    #[account(init, seeds = [b"the_program_state".as_ref()], bump = bump, payer = payer, space = 8 + 8 + 1)]
    global_state: Account<'info, GlobalState>,
    payer: Signer<'info>,
    system_program: Program<'info, System>,
}

#[account]
pub struct GlobalState {
    seconds: u64,
    bump: u8,
}
