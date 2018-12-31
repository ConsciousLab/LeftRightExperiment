console.log("start experiment");
let experiment_blocks = [];

//Define welcome message trial
let welcome = {
    type: "html-keyboard-response",
    stimulus: "ברוכות הבאות לניסוי, לחצו על מקש כלשהו בשביל להתחיל"
};
experiment_blocks.push(welcome);

// Enter fullscreen
const fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: '<p>\מחקר זה מתבצע במסך מלא לחצי על הכפתור מטה בשביל להמשיך.</p>'
};
experiment_blocks.push(fullscreen);

// defining response scales that can be used.
const numberScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numberKnownScale = ["1 - לא מוכר כלל" , 2, 3, 4, 5, 6, 7, 8, 9, "10 - מוכר מאוד"];
const numberAlwaysScale = ["1 - לעולם לא" , 2, 3, 4, 5, 6, 7, 8, 9, "10 - תמיד"];
const numberVeryScale = ["1 - כלל לא" , 2, 3, 4, 5, 6, 7, 8, 9, "10 - מאוד"];
const numberMuchScale = ["1 - כלל לא" , 2, 3, 4, 5, 6, 7, 8, 9, "10 - הרבה מאוד"];
const educationScale = ["מתחת", "בוגרת תיכון", "סטודנטית", "בוגרת תואר ראשון", "בוגרת תואר שני", "מעלה"];

//Ask from the user for details
const StartSurvey = [
    {
        type: "survey-text",
        questions:
            [
                {
                    id: 'age',
                    prompt: "מהו גילך?",
                    columns: 20,
                    rows: 1,
                    value: '',
                    required: true
                },
                {
                    id: 'ID',
                    prompt: "מהי תעודת הזהות של הבודק?",
                    columns: 20,
                    rows: 1,
                    value: '',
                    required: true
                },
                {
                    id: 'PersonNumber',
                    prompt: "מהו מספרך?",
                    columns: 20,
                    rows: 1,
                    value: '',
                    required: true
                }
            ]
    },
    {
        type: "survey-multi-choice",
        questions: [
            {
                data: {test_part: 'gender'},
                id: 'gender',
                prompt: "כיצד היית מגדירה עצמך?",
                options: ["גבר", "אישה", "אחר"],
                required: true
            }]
    },
    {
        type: 'survey-likert',
        questions:
            [
                {
                    prompt: "מהו הסטטוס האקדמי שלך",
                    labels: educationScale,
                    required: true
                }
            ]
    }
];
experiment_blocks = experiment_blocks.concat(StartSurvey);

let introPracticeExp = {
    type: "html-keyboard-response",
    stimulus: "<p> כעת נתחיל את התרגול לניסוי זה</p>\
    <p>לחצי צ אם את רואה את המילה ימין ו ז אם שמאל</p>\
    <p>לחצי על כפתור כלשהו בכדי להמשיך</p>"
};
experiment_blocks.push(introPracticeExp);

//Trial stimulus
let stimulus = [];
for (let i = 0; i < 2; i++) {
    stimulus.push(
        {
            stimulus: '<div style="font-size:500%;" align="center">שמאל</div>',
            data:
                {
                    test_part: 'black_trial_left',
                    correct_response: 'z'
                }
        },
        {
            stimulus: "<div style=\"font-size:500%;\" align=\"center\">ימין</div>",
            data:
                {
                    test_part: 'black_trial_right',
                    correct_response: 'm'
                }
        })
}
//Trial fixation
const fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div align="center" style="font-size:500%;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: "300",
    data: {test_part: 'fixation'},
};

//Trial component
const trial = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['z', 'm'],
    data: jsPsych.timelineVariable('data'),
    on_finish: function (data) {
        data.correct = data.key_press === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    }
};

const first_trial_procedure = {
    id: "mainTrial",
    timeline: [fixation, trial],
    timeline_variables: stimulus,
    randomize_order: true,
    repetitions: 1
};
experiment_blocks.push(first_trial_procedure);

let introMainExp = {
    type: "html-keyboard-response",
    stimulus: "<p> כעת נתחיל את הניסוי עצמו</p>\
    <p>לחצי צ אם את רואה את המילה ימין ו ז אם שמאל</p>\
    <p>אך אם המילה בצבע <span style='color: red'>אדום</span> עשי את <strong style='font-size:larger'>ההיפך</strong></p>\
    <p>לחצי על כפתור כלשהו בכדי להמשיך</p>"
};
experiment_blocks.push(introMainExp);

let secondStimulus = [];
for (let i = 0; i < 5; i++) {
    secondStimulus.push(
        {
            stimulus: '<div style="font-size:500%;" align="center">שמאל</div>',
            data:
                {
                    test_part: 'black_trial_left',
                    correct_response: 'z'
                }
        },
        {
            stimulus: "<div style=\"font-size:500%;\" align=\"center\">ימין</div>",
            data:
                {
                    test_part: 'black_trial_right',
                    correct_response: 'm'
                }
        })
}
for (let i = 0; i < 2; i++) {
    secondStimulus.push(
        {
            stimulus: '<div style="font-size:500%; color: red" align="center">שמאל</div>',
            data:
                {
                    test_part: 'red_trial_left',
                    correct_response: 'l'
                }
        },
        {
            stimulus: "<div style=\"font-size:500%; color: red;\" align=\"center\">ימין</div>",
            data:
                {
                    test_part: 'red_trial_right',
                    correct_response: 'z'
                }
        })
}
const second_trial_procedure = {
    id: "mainTrial",
    timeline: [fixation, trial],
    timeline_variables: secondStimulus,
    randomize_order: true,
    repetitions: 1
};
experiment_blocks.push(second_trial_procedure);

const EndSurvey = [
    {
        type: 'survey-likert',
        questions:
            [
                {
                    prompt: "מ1 עד 10, כמה את חושבת שאת חכמה?",
                    labels: numberScale,
                    required: true
                },
                {
                    prompt: "מ1 עד 10, כמה את חושבת שאת בעלת ביטחון?",
                    labels: numberScale,
                    required: true
                }
            ]
    },
    {
        type: 'survey-likert',
        questions:
            [
                {
                    prompt: "<p> (קראו או התיאור הבא, הלקוח מהספר 'הבית בקרן פו' (אודות פו הדוב):</p>" + "<p>" +
                        "'ופו התבונן בכפות ידיו. הוא ידע שאחת מהן היא הימנית, והוא ידע שאחרי שמחליטים איזו מהן היא" +
                        "הימנית, אז האחרת היא השמאלית, אבל הוא אף פעם לא הצליח לזכור איך מתחילים'." + "</p>" +
                        "<p>מ1 עד 10, עד כמה מצבו של פו שתואר לעיל נשמע לכם מוכר? האם לדעתכם יש לכם קושי כלשהו להבחין בין שמאל\n" +
                        "לימין?</p>",
                    labels: numberAlwaysScale,
                    required: true
                },
                {
                    prompt: "מ1 עד 10, באיזו תדירות אתם מתקשים להבחין בין שני הכיוונים 'ימין' ו'שמאל'?",
                    labels: numberVeryScale,
                    required: true
                },
                {
                    prompt: "מ 1 עד 10, עד כמה הקושי שמעיק עליכם ביום-יום?",
                    labels: numberAlwaysScale,
                    required: true
                },
                {
                    prompt: "מ 1 עד 10, באיזו תדירות אתם מתקשים להבחין בין 'למעלה' ו'למטה'?",
                    labels: numberAlwaysScale,
                    required: true
                }
            ]
    },
    {
        type: "survey-text",
        questions:
            [
                {
                    id: 'age',
                    prompt: "אנא פרטו את שפות אמכם ואת נסיבות רכישתן",
                    columns: 100,
                    rows: 4,
                    value: '',
                    required: true
                },
                {
                    id: 'age',
                    prompt: "האם קשיי השפה שלכם, אם ישנם כאלה, אובחנו אי פעם באופן פורמלי? [כן, לא, לא רלוונטי]",
                    columns: 100,
                    rows: 4,
                    value: '',
                    required: true
                }
            ]
    },
    {
        type: "survey-likert",
        questions:
            [
                {
                    prompt: "האם יש לכם קשיי שפה כלשהם? (קשיי כתיבה, איות, דיסלקציה מאובחנת או לא מאובחנת וכו).",
                    labels: numberMuchScale,
                    required: true
                }
            ]

    },
    {
        type: "survey-multi-choice",
        questions:
            [
                {
                    data: {test_part: 'drivingLic'},
                    prompt: "האם יש לך רישיון נהיגה?",
                    options: ["כן", "לא"],
                    required: true
                },
                {
                    prompt: "האם היית מעורב, כנהג או הולך רגל, בתאונת דרכים בשלוש השנים האחרונות, כולל תאונות קלות ללא פגיעה בגוף או ברכוש?",
                    options: ["כן", "לא"],
                    required: true
                }
            ]
    },
    {
        type: "survey-likert",
        questions:
            [
                {
                    prompt: "בהשוואה לנהג הממוצע, עד כמה אתה נהג טוב לדעתך?",
                    labels: numberVeryScale,
                    required: true
                },
                {
                    prompt: "להערכתך, בכמה תאונות היית מעורבת בשלוש השנים האחרונות כנהגת, כולל תאונות קטנות ללא פגיעה בגוף או ברכוש",
                    labels: numberScale,
                    required: true
                },
                {
                    prompt: "להערכתך, בכמה כמעט תאונות היית מעורבת בשלוש השנים האחרונות כנהגת",
                    labels: numberScale,
                    required: true
                },
                {
                    prompt: "כשאת משתמשת בתוכנת ניווט (וויז לדוגמא), כמה את מסתכלת על המסך?",
                    labels: numberMuchScale,
                    required: true
                }
            ]
    },
];

function downloadCSV(data) {
    let csv = data;
    let link = document.createElement('a');
    document.body.innerHTML += '<div style="position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000;"></div>';
    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    let exportData = encodeURI(csv);
    link.setAttribute('href', exportData);
    link.setAttribute('download', 'experiment_results.csv');
    link.innerText += "download";
    document.body.innerHTML = '<h1 align="center">' + link.outerHTML + '</h1>';
    link.click();
}

experiment_blocks = experiment_blocks.concat(EndSurvey);

const thankYou = {
    type: "html-keyboard-response",
    stimulus: '<div class="center">תודה לך על ההשתתפות בניסוי! לחצי רווח בכדי לסיימו </div>',
    choices: [32]
};
experiment_blocks.push(thankYou);

jsPsych.init({
    timeline: experiment_blocks,
    fullscreen: true,
    on_finish: function () {
        //jsPsych.data.displayData();
        downloadCSV(jsPsych.data.get().csv());
    }
});






