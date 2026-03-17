export interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
}
