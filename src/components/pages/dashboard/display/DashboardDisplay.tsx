import './DashboardDisplay.css';

export function DashboardDisplay({
    heading,
    intro,
    children,
    icon,
}: {
    heading: string;
    intro: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
}) {
    return (
        <section className="dashboard-display">
            <div className="dashboard-heading">
                {icon && <span className="dashboard-icon">{icon}</span>}
                <h2>{heading}</h2>
            </div>
            <p className="dashboard-intro">{intro}</p>

            {children && <div className="dashboard-widgets">{children}</div>}
        </section>
    );
}