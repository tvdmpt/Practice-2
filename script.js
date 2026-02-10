// Все права на практическую работу №2 защищены Владиславом Грековым
// Персональный трекер расходов

// Структура одного расхода:
// {
//   id: number,
//   title: string,
//   amount: number,
//   category: string
// }

const expenseTracker = {
  expenses: [],
  lastId: 0,

  validateExpense(title, amount, category) {
    if (!title || typeof title !== "string") {
      console.error("Ошибка: некорректное название расхода");
      return false;
    }
    if (typeof amount !== "number" || amount <= 0) {
      console.error("Ошибка: сумма должна быть положительным числом");
      return false;
    }
    if (!category || typeof category !== "string") {
      console.error("Ошибка: некорректная категория");
      return false;
    }
    return true;
  },

  addExpense(title, amount, category) {
    if (!this.validateExpense(title, amount, category)) return;

    const expense = {
      id: ++this.lastId,
      title,
      amount,
      category
    };

    this.expenses.push(expense);
    console.log(`Добавлен расход: ${title} (${amount}₽) [${category}]`);
  },

  printAllExpenses() {
    if (this.expenses.length === 0) {
      console.log("Список расходов пуст");
      return;
    }

    console.log("\n Все мистеры расходы ");
    this.expenses.forEach(exp => {
      console.log(
        `${exp.id}. ${exp.title} — ${exp.amount}₽ (${exp.category})`
      );
    });
  },

  getTotalAmount() {
    const total = this.expenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    console.log("\n Мистер чек ");
    this.expenses.forEach(exp => {
      console.log(`${exp.title}: ${exp.amount}₽`);
    });
    console.log("Мистер ИТОГО:", total, "₽");

    return total;
  },

  getExpensesByCategory(category) {
    const filtered = this.expenses.filter(
      exp => exp.category === category
    );

    const total = filtered.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    console.log(`\nМистер категория: ${category} `);
    filtered.forEach(exp => {
      console.log(`${exp.title}: ${exp.amount}₽`);
    });
    console.log("Потрачено мистеров денег:", total, "₽");

    return filtered;
  },

  findExpenseByTitle(searchString) {
    const expense = this.expenses.find(exp =>
      exp.title.toLowerCase().includes(searchString.toLowerCase())
    );

    if (expense) {
      console.log("\nНайден мистеррасход:", expense);
      return expense;
    }

    console.log("\nМистер расход не найден");
    return null;
  },

  removeExpenseById(id) {
    const index = this.expenses.findIndex(exp => exp.id === id);

    if (index === -1) {
      console.error("Мистер расход с таким id не найден");
      return;
    }

    const removed = this.expenses.splice(index, 1)[0];
    console.log(`\nУдалён мистер расход: ${removed.title}`);
  },

  getCategoryStatistics() {
    const stats = this.expenses.reduce((result, exp) => {
      if (!result[exp.category]) {
        result[exp.category] = 0;
      }
      result[exp.category] += exp.amount;
      return result;
    }, {});

    console.log("\n Мистер статистика по категориям ");
    for (const category in stats) {
      console.log(`${category}: ${stats[category]}₽`);
    }

    return stats;
  }
};


// Примеры использования

expenseTracker.addExpense("Кофе", 250, "Еда");
expenseTracker.addExpense("Обед", 600, "Еда");
expenseTracker.addExpense("Такси", 800, "Транспорт");
expenseTracker.addExpense("Подписка", 199, "Подписки");

expenseTracker.printAllExpenses();
expenseTracker.getTotalAmount();
expenseTracker.getExpensesByCategory("Еда");
expenseTracker.findExpenseByTitle("такси");
expenseTracker.removeExpenseById(2);
expenseTracker.getCategoryStatistics();
expenseTracker.printAllExpenses();