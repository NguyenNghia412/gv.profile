export interface TeacherSectionTitleProps {
  label: string;
}

const TeacherSectionTitle: React.FC<TeacherSectionTitleProps> = (props) => {
  return (
    <h3 className="my-8 font-semibold text-3xl text-slate-600">
      {props.label}
    </h3>
  );
};

export default TeacherSectionTitle;
