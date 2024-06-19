const expenseNameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const addExpenseButton = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");
const totalAmountDisplay = document.getElementById("totalAmount");
const expenseTemplate = document.getElementById("expenseTemplate");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


displayExpenses();

function addExpense() {
    const expense = {
        id: Date.now(),
        name: expenseNameInput.value,
        amount: amountInput.value,
        date: dateInput.value
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    expenseNameInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
}

function removeExpense(e) {
    if (e.target.tagName === "BUTTON") {
        const id = e.target.parentElement.dataset.id;
        expenses = expenses.filter(expense => expense.id !== parseInt(id));
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenses();
    }
}

function displayExpenses() {
    totalAmount = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
    
    expenseList.innerHTML = ""; // Clear the list before re-populating
    
    expenses.forEach(expense => {
        const expenseItem = document.importNode(expenseTemplate.content, true);

        expenseItem.querySelector(".expense-name").textContent = expense.name;
        expenseItem.querySelector(".expense-amount").textContent = expense.amount;
        expenseItem.querySelector(".expense-date").textContent = expense.date;
        expenseItem.querySelector("li").dataset.id = expense.id;

        expenseList.appendChild(expenseItem);
    });
}