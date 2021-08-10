class Game {
  constructor(logWriter) {
    this.IsGameOver = false;
    this.IsGameTerminated = false;
    this.writerStream = logWriter;
  }

  startNew() {
    this.randomDigit = Math.floor(Math.random() * 2);
    this.IsGameOver = false;
    return `Привет, загадано число 1 или 2, попробуй отгадать?`;
  }

  handleGameCommand(cmd) {
    if (isNaN(cmd))
      return "Так нечестно, ты ввел не число. Давай попробуем еще раз.";

    this.IsGameOver = true;
    const isPredict = Number(cmd) === this.randomDigit;
    this.writerStream.write(String(isPredict) + "\n", "UTF8");
    const mainTxt = isPredict ? "Ура, ты угадал! " : "В этот раз ты проиграл. ";

    return mainTxt + "\nХочешь начать новую игру? (да/нет)";
  }

  handleOutgameCommand(cmd) {
    if (cmd === "да") {
      return this.startNew();
    }
    if (cmd == "нет") {
      this.IsGameTerminated = true;
      this.writerStream.end();
      return "Спасибо за игру :)";
    }
    return 'Неизвестная команда, введи "да" или "нет"';
  }

  handleCommand(cmd) {
    if (this.IsGameTerminated) {
      throw new Error("Game is terminated");
    }
    if (this.IsGameOver) {
      return this.handleOutgameCommand(cmd);
    }
    return this.handleGameCommand(cmd);
  }
}

module.exports = Game;
