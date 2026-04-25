/**
 * Batches DOM updates using requestAnimationFrame to prevent layout thrashing.
 * Useful for updating CSS variables in real-time based on slider inputs.
 */
class RAFScheduler {
  constructor() {
    this.tasks = new Map();
    this.ticking = false;
  }

  schedule(id, task) {
    this.tasks.set(id, task);
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(this.runTasks.bind(this));
    }
  }

  runTasks() {
    this.tasks.forEach((task) => task());
    this.tasks.clear();
    this.ticking = false;
  }
}

export const rafScheduler = new RAFScheduler();
