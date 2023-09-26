import { useEffect, useRef } from 'react';

// rdd imports
import { Form, useFetcher } from 'react-router-dom';

// library
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmiting = fetcher.state === 'submitting';

  const formRef = useRef();
  const formRefFocus = useRef();

  useEffect(() => {
    if (!isSubmiting) {
      formRef.current.reset();
      formRefFocus.current.focus();
    }
  }, [isSubmiting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            ref={formRefFocus}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Budget Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., U$ 100"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="subimit" className="btn btn--dark" disabled={isSubmiting}>
          {isSubmiting && <span>Submiting...</span>}
          {!isSubmiting && (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
