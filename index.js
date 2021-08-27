class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timerEl = document.querySelector(selector);
    this.targetDate = targetDate;
    this.intervalId = null;
    this.daysValue = this.timerEl.children[0].children[0];
    this.hoursValue = this.timerEl.children[1].children[0];
    this.minsValue = this.timerEl.children[2].children[0];
    this.secsValue = this.timerEl.children[3].children[0];
  }

  start() {
    this.changeCounter(this.targetDate);
    this.timeCounterOn(this.targetDate);
  }

  timeCounterOn(endDate) {
    this.intervalId = setInterval(() => this.changeCounter(endDate), 1000);
  }

  changeCounter(endDate) {
    const nowDate = Date.now();
    const time = endDate - nowDate;

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    this.daysValue.textContent = days < 10 ? `0${days}` : days;

    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.hoursValue.textContent = hours < 10 ? `0${hours}` : hours;

    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    this.minsValue.textContent = mins < 10 ? `0${mins}` : mins;

    const secs = Math.floor((time % (1000 * 60)) / 1000);
    this.secsValue.textContent = secs < 10 ? `0${secs}` : secs;
  }

  stop() {
    refs.startBtn.disabled = false;
    clearInterval(this.intervalId);
  }
}

const refs = {
  endDate: document.querySelector("#end"),
  startBtn: document.querySelector('[data-action="start"]'),
  stopBtn: document.querySelector('[data-action="stop"]'),
};

const mainTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: Date.now(),
});

refs.startBtn.addEventListener("click", () => {
  const endDate = Date.parse(refs.endDate.value);
  if (endDate > Date.now()) {
    refs.startBtn.disabled = true;
    mainTimer.targetDate = endDate;
    mainTimer.start();
  } else {
    alert("Please choose a date in the future");
  }
});

refs.stopBtn.addEventListener("click", () => mainTimer.stop());
