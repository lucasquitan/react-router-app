// rrd imports
import { useLoaderData } from 'react-router-dom';

// components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';

//  helper functions
import { createBudget, fetchData, waait } from '../helpers';
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
      /** some logic*/
      return toast.success('Budget created!');
    } catch (e) {
      throw new Error('There is a problem with your budget');
    }
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Wellcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">{/** some logic */}</div>
          <div className="gird-lg">
            <AddBudgetForm />
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
