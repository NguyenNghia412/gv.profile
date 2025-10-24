import { LucideIcon } from "lucide-react";
import React from "react";
import LoginToView from "../login-to-view";

export interface TeacherItemInfoProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  isNeedLogin?: boolean;
}

const TeacherItemInfo: React.FC<TeacherItemInfoProps> = (props) => {
  return (
    <div className="px-5 py-3 flex flex-row justify-between text-sm text-slate-400">
      <div className="flex flex-row">
        <props.icon size={16} />
        <span className="ml-2">{props.label}:</span>
      </div>
      <p className="inline-block max-w-96 text-right">
        {props.isNeedLogin ? (
          <LoginToView />
        ) : (
          <span className="text-slate-600">{props.value}</span>
        )}
      </p>
    </div>
  );
};

export default TeacherItemInfo;
