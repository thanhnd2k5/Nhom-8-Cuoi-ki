import React from 'react';
import { useModel } from 'umi';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';
import { LogoutOutlined } from '@ant-design/icons';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
	const { initialState } = useModel('@@initialState');
	console.log('initialState in RightContent:', initialState);

	// Hàm logout
	const handleLogout = () => {
		// Nếu dùng OIDCBounder như trong AvatarDropdown
		// @ts-ignore
		import('../OIDCBounder').then(mod => mod.OIDCBounder.getActions().dangXuat());
	};

	if (!initialState || !initialState.currentUser) {
		return null;
	}

	return (
		<div className={styles.right} style={{ display: 'flex', alignItems: 'center' }}>
			{/* <ModuleSwitch /> */}

			{/* <NoticeIconView /> */}

			{/* <Tooltip title='Giới thiệu chung' placement='bottom'>
				<a onClick={() => history.push('/gioi-thieu')}>
					<InfoCircleOutlined />
				</a>
			</Tooltip> */}

			{/* <AvatarDropdown menu /> */}
			{/* Icon đăng xuất luôn hiển thị bên phải */}
			
			<LogoutOutlined
				style={{ fontSize: 22, color: 'red', marginLeft: 24, cursor: 'pointer' }}
				title="Đăng xuất"
				onClick={handleLogout}
			/>
		</div>
	);
};

export default GlobalHeaderRight;
