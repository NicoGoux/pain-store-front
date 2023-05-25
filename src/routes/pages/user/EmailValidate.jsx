import React, { useEffect } from 'react';
import { useAuth } from '../../../contexts/UserContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function EmailValidate() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		const emailConfirmToken = searchParams.get('emailToken');
		const token = auth.getToken();
		console.log(token);
		if (emailConfirmToken) {
			const validateEmail = async () => {
				try {
					await toast.promise(
						auth.validateEmail({
							emailConfirmToken: emailConfirmToken,
						}),
						{
							loading: 'Validando...',
							success: 'Email validado!',
							error: 'El email no pudo ser validado',
						}
					);
				} catch (error) {
					console.log();
				} finally {
					navigate('/account/profile');
				}
			};
			validateEmail();
		}
	}, []);

	return <></>;
}

export { EmailValidate };
