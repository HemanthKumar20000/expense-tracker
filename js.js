const expenseInput = document.getElementById("expense_title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("expense_date");
const form = document.getElementById("form_add_expense");

const expenseListContainer = document.getElementById("expenseList");
const total = document.getElementById("total");

let expenses = [];
let edit_index = null;

/* FORM SUBMIT */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const expense = {
        title: expenseInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value,
        date: dateInput.value
    };

    if (edit_index === null) {
        expenses.push(expense);
    } else {
        expenses[edit_index] = expense;
        edit_index = null;
        form.querySelector("button").textContent = "Add Expense";
    }



    renderExpenseList();
    form.reset();
});

/* RENDER LIST */
function renderExpenseList() {
    expenseListContainer.innerHTML = "";

    expenses.forEach((expense, index) => {
        const div = document.createElement("div");
        div.className = "expense-item";

        div.innerHTML = `
            <div class="expense-info">
                <h4>${expense.title}</h4>
                <div class="expense-meta">
                    <span class="expense-category">${expense.category}</span>
                    <span class="expense-date">${expense.date}</span>
                </div>
            </div>
            <div class="expense-actions">
                <span class="expense-amount">₹${expense.amount}</span>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;

        expenseListContainer.appendChild(div);
    });

    totalAmount();
}

/* TOTAL */
function totalAmount() {
    const tot = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    total.textContent = `₹${tot}`;
}

/* EDIT & DELETE (EVENT DELEGATION) */
expenseListContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.dataset.index;
        expenses.splice(index, 1);
        renderExpenseList();
    }

    if (e.target.classList.contains("edit-btn")) {
        edit_index = e.target.dataset.index;
        const expense = expenses[edit_index];

        expenseInput.value = expense.title;
        amountInput.value = expense.amount;
        categoryInput.value = expense.category;
        dateInput.value = expense.date;

        form.querySelector("button").textContent = "Update Expense";
    }

    
}   
)
const clearBtn = document.getElementById("clearAll");

clearBtn.addEventListener("click", () => {
    expenses = [];
    edit_index = null;

    expenseListContainer.innerHTML = "";
    total.textContent = "₹0";

    form.reset();
    form.querySelector("button").textContent = "Add Expense";
});;
