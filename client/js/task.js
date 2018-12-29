console.log("start experiment");
let experiment_blocks = [];

//Define welcome message trial
let welcome = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};
experiment_blocks.push(welcome);

// Enter fullscreen
const fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: '<p>This study runs in fullscreen. To switch to full screen mode \
  and start the HIT, press the button below.</p>'
};
experiment_blocks.push(fullscreen);

// defining response scales that can be used.
const numberScale = [1,2,3,4,5,6,7,8,9,10];
const educationScale = ["Less", "High school graduate", "College student", "BA", "Master's degree", "Above"];

//Ask from the user for details
const StartSurvey = [
    {
        type: "survey-text",
        questions:
            [
                {
                    id: 'name',
                    prompt: "What is your name?",
                    columns: 20,
                    rows: 1,
                    value: ''
                },
                {
                    id: 'age',
                    prompt: "How old are you?",
                    columns: 20,
                    rows: 1,
                    value: ''
                },
                {
                    id: 'ID',
                    prompt: "What is the ID of the person who give you this experiment?",
                    columns: 20,
                    rows: 1,
                    value: ''
                },
                {
                    id: 'PersonNumber',
                    prompt: "Your experiment number?",
                    columns: 20,
                    rows: 1,
                    value: ''
                }
            ]
    },
    {
        type: "survey-multi-choice",
        questions: [
            {
                data: {test_part: 'gender'},
                id: 'gender',
                prompt: "What is your gender?",
                options: ["Male", "Female", "Other"],
                required: true
            }]
    },
    {
        type: 'survey-likert',
        questions: [{prompt: "What is your education status", labels: educationScale}]
    }
];
experiment_blocks = experiment_blocks.concat(StartSurvey);

let introPracticeExp = {
    type: "html-keyboard-response",
    stimulus: "Let's start with some practice.\n" +
        "press m if you see the word right and z if you see the word left.\n" +
        "Press any key to begin."
};
experiment_blocks.push(introPracticeExp);

//Trial stimulus
let stimulus = [];
for(let i = 0 ;i < 20; i++){
    stimulus.push(
        { stimulus: '<div style="font-size:500%;" align="center">left</div>',
            data: {test_part: 'black_trial_left', correct_response: 'f'}},
        { stimulus: "<div style=\"font-size:500%;\" align=\"center\">right</div>",
            data: {test_part: 'black_trial_right', correct_response: 'j'}})
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
    data: jsPsych.timelineVariable('data')
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
    stimulus: "Now the real experiment begin.\n" +
        "The same introductions as before but if the word is red, to the opposite\n" +
        "Press any key to begin."
};
experiment_blocks.push(introMainExp);

let secondStimulus = [];
for(let i = 0 ;i < 70; i++){
    secondStimulus.push(
        { stimulus: '<div style="font-size:500%;" align="center">left</div>',
            data: {test_part: 'black_trial_left', correct_response: 'f'}},
        { stimulus: "<div style=\"font-size:500%;\" align=\"center\">right</div>",
            data: {test_part: 'black_trial_right', correct_response: 'j'}})
}
for(let i = 0 ;i < 30; i++){
    secondStimulus.push(
        { stimulus: '<div style="font-size:500%; color: red" align="center">left</div>',
            data: {test_part: 'red_trial_left', correct_response: 'f'}},
        { stimulus: "<div style=\"font-size:500%; color: red;\" align=\"center\">right</div>",
            data: {test_part: 'red_trial_right', correct_response: 'j'}})
}
const second_trial_procedure = {
    id: "mainTrial",
    timeline: [fixation, trial],
    timeline_variables: secondStimulus,
    randomize_order: true,
    repetitions: 1
};
experiment_blocks.push(second_trial_procedure);

const EndSurvey = {
    type: 'survey-likert',
    questions: [
        {prompt: "How smart do you think you are?", labels: numberScale},
        {prompt: "How confident do you think you are?", labels: numberScale}
    ]
};


experiment_blocks.push(EndSurvey);

const thankYou = {
    type: "html-keyboard-response",
    stimulus: '<div class="center">Thank you for participating in this study!<p>\
            In this study</p>\
            <p>Once you press the space bar, your results will be uploaded to the \
            server, and the experiment will complete.</p>\
            <p>Press the space bar to complete this experiment.</p></div>',
    choices: [32]
};
experiment_blocks.push(thankYou);

jsPsych.init({
    timeline: experiment_blocks,
    fullscreen: true,
    on_finish: function () {
        let redTrialLeftData = jsPsych.data.get().filter({test_part: 'red_trial_left'});
        let redTrialRightData = jsPsych.data.get().filter({test_part: 'red_trial_right'});
        let blackTrialRightData = jsPsych.data.get().filter({test_part: 'black_trial_right'});
        let blackTrialLeftData = jsPsych.data.get().filter({test_part: 'black_trial_left'});
        let surveyTextData = jsPsych.data.get().filter({trial_type: 'survey-text'});
        let surveyMultiChoiceData = jsPsych.data.get().filter({trial_type: 'survey-multi-choice'});
        let surveryRtData = jsPsych.data.get().filter({trial_type: 'survey-likert'});

        console.log(blackTrialLeftData);
        console.log(redTrialRightData);
        console.log(redTrialLeftData);
        console.log(blackTrialRightData);
        console.log(surveryRtData);
        console.log(surveyMultiChoiceData);
        console.log(surveyTextData);

        jsPsych.data.displayData();
    }
});




