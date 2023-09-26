// rrd imports
import { useLoaderData } from 'react-router-dom';

// components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';

//  helper functions
import { createBudget, createExpense, fetchData, waait } from '../helpers';
import { toast } from 'react-toastify';

// loader
export function dashboardLoader() {
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');
  return { userName, budgets };
}

// action
export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action == 'newUser') {
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName));
      return toast.success(`Wellcome, ${values.userName}`);
    } catch (e) {
      throw new Error('There is a problem with your account.');
    }
  }
  // new budget
  if (_action == 'createBudget') {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success('Budget created!');
    } catch (e) {
      throw new Error('There is a problem with your budget');
    }
  }

  // new expense
  if (_action == 'createExpense') {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense "${values.newExpense}" was created!`);
    } catch (e) {
      throw new Error('There is a problem with your expense');
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Wellcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="gird-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budget is the secret to financial freedom.</p>
                <p>Create a budget to get started.</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
