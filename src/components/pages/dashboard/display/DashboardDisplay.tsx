import './DashboardDisplay.css';

export function DashboardDisplay({
    heading,
    intro,
    children,
}: {
    heading: string;
    intro: string;
    children?: React.ReactNode;
}) {
    return (
        <section className="dashboard-display">
            <h2>{heading}</h2>
            <p className="dashboard-intro">{intro}</p>

            {children && <div className="dashboard-widgets">{children}</div>}
        </section>
    );
}