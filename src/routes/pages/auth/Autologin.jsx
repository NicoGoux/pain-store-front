import React, { useEffect } from 'react';
import { useAuthService } from '../../../contexts/UserContext';
import { Outlet, useHref, useNavigate } from 'react-router-dom';
import { Loader } from '../../../components/auxComponents/loader/Loader';

function Autologin() {
	const auth = useAuthService();
	const href = useHref();
	const navigate = useNavigate();

	useEffect(() => {
		if (href == '#/') {
			navigate('/home');
		}
	}, [href]);

	return (
		<>
			{auth.loadingUser ? (
				<>
					<div className='main-container'>
						<Loader />
					</div>
				</>
			) : (
				<Outlet />
			)}
		</>
	);
}

export { Autologin };
