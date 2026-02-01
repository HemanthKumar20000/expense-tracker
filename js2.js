const expense_title=document.getElementById("expense_title");
const amount=document.getElementById("amount");
const category=document.getElementById("category");
const date_input=document.getElementById("expense_date");
const form=document.getElementById("form_add_expense");
const expenseListContainer=document.getElementById("expenseList");
const tot=document.getElementById("total");
const Expenses=[];
let edit_index = null;
const submitbtn=document.getElementById("submit");
const filter=document.getElementById("filter-category");
const clearfilter=document.getElementById("clear-filter");
let filterd_expenses=Expenses;
const monthFilter = document.getElementById("filter-month");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let expense={
        title:expense_title.value,
        am:Number(amount.value),
        cat:category.value,
        date_in:date_input.value
        };
    if (edit_index===null){
        Expenses.push(expense)
        
    }
    else{
        Expenses[edit_index]=expense;
        edit_index=null;
        submitbtn.textContent="ADD Expense";

    }
    console.log(Expenses);
    renderExpenseList();
    form.reset();


});

function renderExpenseList(list=Expenses){
        expenseListContainer.innerHTML="";

       
        list.forEach((expense)=>{
            const originalindex=Expenses.indexOf(expense)
        let div=document.createElement("div");
        div.innerHTML = `
    <div class="info">
        <h4>${expense.title}</h4>
        <div class="meta-info">
            <span class="cat">${expense.cat}</span>
            <span class="dat">${expense.date_in}</span>
        </div>
        <div class="expense_actions">
            <span class="amount">₹${expense.am}</span>
            <button type="button" class="editbutton" data-index="${originalindex}">Edit</button>
            <button type="button" class="deletebutton" data-index="${originalindex}">Delete</button>
        </div>
    </div>
`;
        
        expenseListContainer.appendChild(div);
        });
        totalAmount(list);

}

function totalAmount(list=Expenses){
    let t=list.reduce((acc,expense)=>{
        acc=acc+expense.am;
        return acc
    },0)
    tot.textContent=`₹${t}`;
}
expenseListContainer.addEventListener("click",(e)=>{
        if(e.target.classList.contains("deletebutton")){
            const ind=e.target.dataset.index;
            Expenses.splice(ind,1);
            renderExpenseList();
        }

        if (e.target.classList.contains("editbutton")) {
        edit_index = e.target.dataset.index;
        const exp = Expenses[edit_index];

        expense_title.value = exp.title;
        amount.value = exp.am;
        category.value = exp.cat;
        date_input.value = exp.date_in;

        submitbtn.textContent = "Update Expense";
    }})
document.getElementById("clear").addEventListener("click", () => {
    Expenses.length = 0;
    edit_index = null;
    renderExpenseList();
    form.reset();
    submitbtn.textContent = "Add Expense";
});

filter.addEventListener("change",(e)=>{
    const selectcat=e.target.value;
    if (selectcat===""){
        filterd_expenses=Expenses;
    }
    else{
        filterd_expenses=Expenses.filter((exp)=>{
            return exp.cat===selectcat;
        })
    }
    renderExpenseList(filterd_expenses)
});

clearfilter.addEventListener("click",()=>{

    filterd_expenses=Expenses;
    filter.value=""
    monthFilter.value = "";
    renderExpenseList(filterd_expenses)
    
})

monthFilter.addEventListener("change", (e) => {
    const selectedMonth = e.target.value;

    if (selectedMonth === "") {
        filterd_expenses = Expenses;
    } else {
        filterd_expenses = Expenses.filter((exp) => {
            const expMonth = new Date(exp.date_in).getMonth();
            return expMonth === Number(selectedMonth);
        });
    }

    filter.value = "";  
    renderExpenseList(filterd_expenses);
});