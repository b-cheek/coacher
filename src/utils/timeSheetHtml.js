import { Formula } from "./vdotCalc";
import { secondsToTimeStr } from "./time";

export default getTimeSheetHtml = (workout, athletes) => {
    const totalTimes = workout.workout.split(" ").reduce((acc, block) => {
        return acc + parseInt(block.split("x")[0]);
    }, 0);
    return (
`
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body>
    <h1 style:"width: 100%; text-align: center;">${workout.title}</h1>
    <div
        style="display: flex; 
        justify-content: center;
        align-items: center;
        flex-direction: column;"
    >
        <h3>Target Times</h3>
        <table style="border-spacing: 5px;">
            <thead>
            <tr>
                <th>Athlete</th>
                ${workout.workout
                .split(" ")
                .map((block) => {
                    return `<th>${block.split("x")[1]}</th>`;
                })
                .join("")}
            </tr>
            </thead>
            <tbody>
            ${athletes
                .map((athlete) => {
                let VDOT = parseFloat(athlete.VDOT);
                return `<tr>
                    <td>${athlete.firstName} ${athlete.lastName}</td>
                    ${workout.workout
                    .split(" ")
                    .map((block) => {
                        let intensity = block.charAt(block.length - 1);
                        let res = "Failed";
                        let distance = block.split("x")[1].slice(0, -1);
                        switch (intensity) {
                        // boilderplate for intensity values E, M, T, I, R
                        case "E":
                            res = Formula.getEasyPace(VDOT, distance);
                            break;
                        case "M":
                            res = Formula.getMarathonPace(VDOT, distance);
                            break;
                        case "T":
                            res = Formula.getThresholdPace(VDOT, distance);
                            break;
                        case "I":
                            res = Formula.getIntervalPace(VDOT, distance);
                            break;
                        case "R":
                            res = Formula.getRepetitionPace(VDOT, distance);
                            break;
                        }
                        return `<td>${secondsToTimeStr(res * 60)}</td>`;
                    })
                    .join("")}
                </tr>`;
                })
                .join("")}
            </tbody>
        </table>
        <h3>Log</h3>
        <table>
            <thead>
            <tr>
                <th>Athlete</th>
                ${workout.workout
                .split(" ")
                .map((block) => {
                    return `${Array(parseInt(block.split("x")[0]))
                    .fill(`<th>${block.split("x")[1]}</th>`)
                    .join("")}`;
                })
                .join("")}
            </tr>
            </thead>
            <tbody>
            ${athletes
                .map((athlete) => {
                return `
                    <tr>
                    <td>${athlete.firstName} ${athlete.lastName}</td>
                    ${Array(totalTimes).fill("<td>_____</td>").join("")}
                    </tr>
                `;
                })
                .join("")}
            </tbody>
        </table>
        <h3>Groups</h3>
        </div>
    </body>
    </html>
`);
}