interface SonSoltProps {
    children?: React.ReactNode;
}

const SonSolt: React.FC<SonSoltProps> = (props: SonSoltProps) => {
    const {children} = props;
    return (
        <div>
            <div className="m-b-24">子组件 Son Slot</div>

            {children}
        </div>
    )
}


export default SonSolt;