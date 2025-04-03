const { exec } = require("node:child_process");

function checkDB() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkDB();
      return;
    }
    console.log("\n🟢 DB aceitando conexões\n");
  }
}

process.stdout.write("\n\n🔴 Aguardando DB aceitar conexões");

checkDB();
