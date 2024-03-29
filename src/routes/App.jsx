import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Store } from './pages/store/Store';
import { Login } from './pages/auth/Login';
import { AdminRoute, AuthRoute, LoggedInRoute, UserProvider } from '../contexts/UserContext';
import { Register } from './pages/auth/Register';
import { Toaster } from 'react-hot-toast';
import { Recovery } from './pages/auth/Recovery';
import { RecoveryPassword } from './pages/auth/RecoveryPassword';
import { AppProvider } from '../contexts/AppContext';
import { ProductDetailContainer } from './pages/store/ProductDetailContainer';
import { Profile } from './pages/user/Profile';
import { EmailValidate } from './pages/user/EmailValidate';
import { Cart } from './pages/user/Cart';
import { NotFound } from './pages/notFound/NotFound';
import { Unauthorized } from './pages/unauthorized/Unauthorized';
import { Management } from './pages/admin/Management';
import { Autologin } from './pages/auth/Autologin';
import { AddProduct } from './pages/admin/AddProduct';
import { AddAdmin } from './pages/admin/AddAdmin';
import { OrderDetail } from './pages/order/OrderDetail';
import { Preorder } from './pages/order/Preorder';
import { Order } from './pages/order/Order';
import { PurchaseOrders } from './pages/user/PurchaseOrders';
import { PurchaseOrderDetail } from './pages/purchaseOrderDetail/PurchaseOrderDetail';
import { NavComponent } from '../components/navComponents/NavComponent';
import { PurchaseOrdersAdmin } from './pages/admin/PurchaseOrdersAdmin';
import { PaymentMethodManagement } from './pages/admin/PaymentMethodManagement';
import { Home } from './pages/home/Home';
import { Contact } from './pages/contact/Contact';

function App() {
	return (
		<>
			<div>
				<Toaster />
			</div>
			<HashRouter>
				<AppProvider>
					<UserProvider>
						<NavComponent />

						<Routes>
							<Route path='/' element={<Autologin />}>
								{/* Static routes */}
								<Route path='/home' element={<Home />} />
								<Route path='/contact' element={<Contact />} />
								{/* Store routes */}
								<Route path='/store' element={<Store />}>
									<Route path=':id' element={<ProductDetailContainer />} />
								</Route>
								<Route
									path='/preorder'
									element={
										<AuthRoute>
											<Preorder />
										</AuthRoute>
									}
								/>
								<Route
									path='/order'
									element={
										<AuthRoute>
											<Order />
										</AuthRoute>
									}
								/>
								<Route
									path='/order/detail'
									element={
										<AuthRoute>
											<OrderDetail />
										</AuthRoute>
									}
								/>
								{/* Auth routes */}
								<Route
									path='/login'
									element={
										<LoggedInRoute>
											<Login />
										</LoggedInRoute>
									}
								/>
								<Route
									path='/login/recovery'
									element={
										<LoggedInRoute>
											<Recovery />
										</LoggedInRoute>
									}
								/>
								<Route
									path='/login/recovery/password'
									element={
										<LoggedInRoute>
											<RecoveryPassword />
										</LoggedInRoute>
									}
								/>
								<Route
									path='/logout'
									element={<Navigate to={'/store'} replace={true} />}
								></Route>
								<Route
									path='/register'
									element={
										<LoggedInRoute>
											<Register />
										</LoggedInRoute>
									}
								/>
								{/* User routes */}
								<Route
									path='/account'
									element={<Navigate to={'/account/profile'} replace={true} />}
								/>
								<Route
									path='/account/profile'
									element={
										<AuthRoute>
											<Profile />
										</AuthRoute>
									}
								/>
								<Route
									path='/account/validate-email'
									element={<EmailValidate />}
								></Route>
								<Route
									path='/account/cart'
									element={
										<AuthRoute>
											<Cart />
										</AuthRoute>
									}
								>
									<Route path=':id' element={<ProductDetailContainer />} />
								</Route>
								<Route
									path='/account/orders'
									element={
										<AuthRoute>
											<PurchaseOrders />
										</AuthRoute>
									}
								/>
								<Route
									path='/account/orders/:id'
									element={
										<AuthRoute>
											<PurchaseOrderDetail />
										</AuthRoute>
									}
								/>
								{/* Admin routes */}
								<Route
									path='/admin/management'
									element={
										<AdminRoute>
											<Management />
										</AdminRoute>
									}
								>
									<Route
										path='add-product'
										element={
											<AdminRoute>
												<AddProduct />
											</AdminRoute>
										}
									/>
									<Route
										path='add-admin'
										element={
											<AdminRoute>
												<AddAdmin />
											</AdminRoute>
										}
									/>
									<Route
										path='orders'
										element={
											<AdminRoute>
												<PurchaseOrdersAdmin />
											</AdminRoute>
										}
									/>
									<Route
										path='payment-methods'
										element={
											<AdminRoute>
												<PaymentMethodManagement />
											</AdminRoute>
										}
									/>
								</Route>
								<Route
									path='/admin/management/orders/:id'
									element={
										<AuthRoute>
											<PurchaseOrderDetail />
										</AuthRoute>
									}
								/>

								{/* Error routes */}
								<Route path='/unauthorized' element={<Unauthorized />} />
								<Route path='*' element={<NotFound />} />
							</Route>
						</Routes>
					</UserProvider>
				</AppProvider>
			</HashRouter>
		</>
	);
}

export default App;
