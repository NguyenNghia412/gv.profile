import React from "react";

export interface LoginToViewProps {
    className?: string
}

const LoginToView: React.FC<LoginToViewProps> = (props) => {
    return <span className={`cursor-pointer text-slate-400 ${props.className}`}>[ Đăng nhập để xem ]</span>
}

export default LoginToView;