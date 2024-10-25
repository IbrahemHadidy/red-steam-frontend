// NextJS
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Actions
import { reset } from '@store/features/user/signup/signupSlice';

export default function ExistingAccountPage() {
  // Initilizations
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Event Handlers
  const handleCreateAccountClick = (): void => {
    dispatch(reset());
  };

  const handleUseExistingClick = (): void => {
    router.push('/login');
  };

  return (
    <div className="existing-account">
      <div className="section-title">Email in use</div>

      <div className="existing-account-text">
        &nbsp;Looks like your email address is already associated with another Steam account.
        <br />
        <br />
        You can use your existing account or recover it if you've forgotten your login.
      </div>

      <div className="use-existing-account">
        <button className="use-existing-btn" onClick={handleUseExistingClick}>
          <span>Use existing account</span>
        </button>

        <Link href="/forgot-password">Recover my account</Link>
      </div>

      <div className="existingacc-ruler" />

      <div className="create-newaccount-instead">
        If you prefer, you can make a new, separate Steam account.
      </div>

      <button className="use-existing-btn" onClick={handleCreateAccountClick}>
        <span>Continue</span>
      </button>
    </div>
  );
}
