export interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    icon: React.ReactNode;
    error?: string;
    children?: React.ReactNode;
}
