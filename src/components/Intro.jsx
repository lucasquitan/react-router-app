// rrd imports
import { Form } from 'react-router-dom';

// library
import { UserPlusIcon } from '@heroicons/react/24/solid';

// assets
import illustration from '../assets/illustration.jpg';

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">Your Money</span>
        </h1>
        <p>Personal budgeting is the secret for financial fredom.</p>
        <p>Start your jorney today.</p>
        <Form method="post">
          <input
            type="text"
            required
            name="userName"
            placeholder="What is your name?"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="" />
    </div>
  );
};

export default Intro;
