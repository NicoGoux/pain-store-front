import { LoginForm } from '../../../components/authComponents/LoginForm';
import { handleMainContainerScroll } from '../../../config/handleMainContainerScroll';

function Login() {
	return (
		<div onScroll={handleMainContainerScroll} className='main-container w-full'>
			<LoginForm />
		</div>
	);
}

export { Login };
