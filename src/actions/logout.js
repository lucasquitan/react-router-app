// rrd imports
import { redirect } from 'react-router-dom';

// helpers
import { deleteItem } from '../helpers';
import { toast } from 'react-toastify';

export async function logoutAction() {
  // delete the user
  deleteItem({
    key: 'userName',
  });

  toast.success('The user account has been removed!');

  // return redirect
  return redirect('/');
}
