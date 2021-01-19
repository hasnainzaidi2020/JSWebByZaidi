class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  // submit buget method
  submitBugetForm(){
    const value = this.budgetInput.value;
    if(value === '' || value <= 0){
     this.budgetFeedback.classList.add('showItem');
     this.budgetFeedback.innerHTML = `<p>Amount Must Not Be Negative Or Empty </p>`
     setTimeout(() => {
       this.budgetFeedback.classList.remove('showItem')
     }, 4000);
    } 
    else
    {
      this.budgetAmount.textContent = value;
      this.budgetInput.value= "";
      this.ShowBalance()
    }
  }
  ShowBalance(){
    const expence = this.totalExpence();  
    const total = parseInt(this.budgetAmount.textContent) - expence;
    this.balanceAmount.textContent = total;

    if(total < 0)
    {
      this.balance.classList.remove("showGreen","showBlack")
      this.balance.classList.add('showRed')
    }
    else if(total > 0)
    {
      this.balance.classList.remove('showRed','showBlack')
      this.balance.classList.add('showGreen')
    }
    else if(total === 0)
    {
      this.balance.classList.remove('showRed','showGreen')
      this.balance.classList.add('showBlack')
    }
  }

  //function of Expence From
  SubmitExpenceForm(){
   const ExpenceValue = this.expenseInput.value;  //name 
   const AmountValue  = this.amountInput.value;   // price
  
   if(ExpenceValue === '' || AmountValue === '' ||  AmountValue < 0 ){
    this.expenseFeedback.classList.add('showItem')
    this.expenseFeedback.innerHTML = `<p>Please Enter Expence Name Or Amount Must Greator Than Zero</p>`
    setTimeout(() => {
      this.expenseFeedback.classList.remove('showItem')
    }, 4000);
   }
   else
   {
     let amount = parseInt(AmountValue);
     this.expenseInput.value = "";
     this.amountInput.value = "";

     let expense = {
       id : this.itemID, // id
       title : ExpenceValue, // ex name
       amount : amount  // ex amount
     };
     this.itemID++;
     this.itemList.push(expense)
     this.addExpence(expense)
     this.ShowBalance();

   }

  }

  // add expence

  addExpence(expence){
  const div = document.createElement('div')
  div.classList.add('expence')
  div.innerHTML = `
  <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">- ${expence.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expence.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
  
  `
  this.expenseList.appendChild(div)
  }

/// funtion of total expence
 totalExpence(){
  let total = 0;
  if(this.itemList.length > 0){
  total = this.itemList.reduce(function(acc,curr){
    acc+= curr.amount;
    return acc;
  },0);
  }
  this.expenseAmount.textContent = total;
  return total;
  }
  // edit expence
  editExpence(element){
     let id = parseInt(element.dataset.id);
     let parent = element.parentElement.parentElement.parentElement;
     // remove from dom
     this.expenseList.removeChild(parent);
     // remove from  the dom
   let expense123= this.itemList.filter(function(item){
     return item.id === id; 
   });
// value is
this.expenseInput.value = expense123[0].title;
this.amountInput.value  = expense123[0].amount;
   // remove from list
   let templist = this.itemList.filter(function(item){
     return item.id !== id;
   });
   this.itemList = templist;
   this.ShowBalance();
  }
  // edit expence
   deleteExpence(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    // remove from dom
    this.expenseList.removeChild(parent);
    let templist = this.itemList.filter(function(item){
      return item.id !== id;
    });
    this.itemList = templist;
    this.ShowBalance();
  }
}

function addEventListner(){
  const bugetForm   = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  //   new instance of class UI
  const ui = new UI()

  //buget form submit
  bugetForm.addEventListener('submit',function(event){
    event.preventDefault();
    ui.submitBugetForm()
  })

    //expence form submit
    expenseForm.addEventListener('submit',function(event){
    event.preventDefault();
    ui.SubmitExpenceForm()
    })

  //Expence List
  expenseList.addEventListener('click',function(event){
    if(event.target.parentElement.classList.contains('edit-icon'))
    {
   ui.editExpence(event.target.parentElement)
   console.log(event.target.parentElement)
    }
    else if(event.target.parentElement.classList.contains('delete-icon'))
    {
      ui.deleteExpence(event.target.parentElement)
    }
  })
}

document.addEventListener('DOMContentLoaded',function(){
  addEventListner();
})
