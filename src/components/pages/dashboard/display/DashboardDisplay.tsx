import './DashboardDisplay.css';

export function DashboardDisplay({
    heading,
    intro,
    children,
    icon,
    disableGrid = false,
}: {
    heading: string;
    intro: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    disableGrid?: boolean;
}) {
    return (
        <section className="dashboard-display">
            <div className="dashboard-heading">
                {icon && <span className="dashboard-icon">{icon}</span>}
                <h2>{heading}</h2>
            </div>
            <p className="dashboard-intro">{intro}</p>

            {children && (disableGrid ? (
                <div className="dashboard-content">{children}</div>
            ) : (
                <div className="dashboard-widgets">{children}</div>
            ))}
        </section>
    );
}