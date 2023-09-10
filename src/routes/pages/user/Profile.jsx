import React, { useEffect, useState } from 'react';
import { Loader } from '../../../components/auxComponents/loader/Loader';
import { useAuthService } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { ProfileComponent } from '../../../components/userComponents/profileComponents/ProfileComponent';
import { handleMainContainerScroll } from '../../../config/handleMainContainerScroll';

function Profile() {
	const [completeUser, setCompleteUser] = useState(null);

	const navigate = useNavigate();
	const authService = useAuthService();

	useEffect(() => {
		if (!completeUser) {
			const getUser = async () => {
				const user = await authService.getUserLogged();
				if (!user) {
					navigate('/store');
				}
				setCompleteUser(user);
			};
			getUser();
		}
	}, []);
	return (
		<section onScroll={handleMainContainerScroll} className={`relative main-container w-full`}>
			<div className='user-section-card'>
				{completeUser ? (
					<ProfileComponent user={completeUser} authService={authService} />
				) : (
					<div>
						<Loader />
					</div>
				)}
			</div>
		</section>
	);
}

export { Profile };
