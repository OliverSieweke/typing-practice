import "./ProgressBar.css";


const calculatePercentage = (value, minValue, maxValue) => {
    if (isNaN(value) || isNaN(minValue) || isNaN(maxValue)) {
        throw Error(
            `ProgressBar: Cannot render component. If you decide not to provide a percantage prop, you need to provide "value", "minValue" and "maxValue" (all three).`,
        );
    }
    return (value/(maxValue - minValue))*100;
};

export default function ProgressBar(props) {
    let { percentage, value, minValue, maxValue } = props;
    let className = "ProgressBar";

    try {
        percentage = percentage ?? calculatePercentage(value, minValue, maxValue);
    } catch (error) {
        className += " error";
    }

    if (percentage < 0 || percentage > 100) {
        percentage = 100;
        className += " error";
    }

    return (
        <div className={className}>
            <div className="progress" style={{ width: percentage + "%" }}>
                <span>{percentage.toFixed(0)}%</span>
            </div>
        </div>
    );
}
