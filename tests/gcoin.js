const anchor = require('@project-serum/anchor');


describe('gcoin', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.Gcoin;
    const [_pda, _bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("the_program_state"))],
      program.programId
    );
    const seconds = new anchor.BN(1234);
    const tx = await program.rpc.initialize(_bump, seconds, {
      accounts: {
        globalState: _pda,
        payer: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      // signers: [myAccount],
    });
    console.log("Your transaction signature", tx);
  });

  it('Is read!', async () => {
    // Add your test here.
    const program = anchor.workspace.Gcoin;
    const [_pda, _bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("the_program_state"))],
      program.programId
    );
    const seconds = new anchor.BN(1234);
    const tx = await program.rpc.read(seconds, {
      accounts: {
        globalState: _pda,
      },
      // signers: [myAccount],
    });
    console.log("Your transaction signature", tx);
  });

});
