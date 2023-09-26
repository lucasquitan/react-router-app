// rrd imports
import { useLoaderData } from 'react-router-dom';

// components
import Intro from '../components/Intro';

//  helper functions
import { fetchData } from '../helpers';
import { toast } from 'react-toastify';

// loader
export function dashboardLoader() {
  const userName = fetchData('userName');
  return { userName };
}

// action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem('userName', JSON.stringify(formData.userName));
    return toast.success(`Wellcome, ${formData.userName}`);
  } catch (e) {
    throw new Error('There is a problem with your account.');
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData();
  return <>{userName ? <h1>{userName}</h1> : <Intro />}</>;
};
export default Dashboard;
