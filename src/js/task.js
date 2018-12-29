console.log('start task.js');

let experiment_blocks = [];
// experiment_blocks.push(test_animation);
// experiment_blocks.push(poor_animation);

//Define welcome message trial
let welcome = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};
experiment_blocks.push(welcome);

//Enter fullscreen
const fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: '<p>This study runs in fullscreen. To switch to full screen mode \
  and start the HIT, press the button below.</p>'
};
experiment_blocks.push(fullscreen);

// defining response scales that can be used.
const numberScale = [1,2,3,4,5,6,7,8,9,10];
const educationScale = ["Less ", "High school graduate", "College student", "BA", "Master's degree", "Above"];

//Ask from the user for details
const StartSurvey = [
    {
        type: "survey-text",
        questions:
            [
                {
                    name: 'age',
                    prompt: "How old are you?",
                    columns: 20,
                    rows: 1,
                    value: ''
                },
                {
                    id: 'name',
                    prompt: "What is your name?",
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
                id: 'gender',
                prompt: "What is your gender?",
                options: ["Male", "Female", "Other"],
                required: true
            }]
    },
    {
        type: 'survey-likert',
        questions: [{prompt: "What is your education status", labels: educationScale}]
    },
    {
        type: 'survey-likert',
        questions: [{prompt: "How smart do you think you are.", labels: numberScale}]
    },
    {
        type: 'survey-likert',
        questions: [{prompt: "How confident do you think you are.", labels: numberScale}]
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
for(let i = 0 ;i < 30; i++){
    stimulus.push(
        { stimulus: '<div style="font-size:500%;" align="center">left</div>',
            data: {test_part: 'trial', correct_response: 'f'}},
        { stimulus: "<div style=\"font-size:500%;\" align=\"center\">right</div>",
            data: {test_part: 'trial', correct_response: 'j'}})
}
//Trial fixation
const fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div align="center" style="font-size:500%;">+</div>',
    choices: ['z', 'm'],
    data: {test_part: 'fixation'},
};

//Trial component
const trial = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: jsPsych.NO_KEYS,
    data: jsPsych.timelineVariable('data'),
    trial_duration: "300",
    on_finish: function(data){
        data.correct = data.key_press === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    }
};

const first_trial_procedure = {
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
            data: {test_part: 'trial', correct_response: 'f'}},
        { stimulus: "<div style=\"font-size:500%;\" align=\"center\">right</div>",
            data: {test_part: 'trial', correct_response: 'j'}})
}
for(let i = 0 ;i < 30; i++){
    secondStimulus.push(
        { stimulus: '<div style="font-size:500%; color: red" align="center">left</div>',
            data: {test_part: 'trial', correct_response: 'f'}},
        { stimulus: "<div style=\"font-size:500%; color: red;\" align=\"center\">right</div>",
            data: {test_part: 'trial', correct_response: 'j'}})
}
const second_trial_procedure = {
    timeline: [fixation, trial],
    timeline_variables: secondStimulus,
    randomize_order: true,
    repetitions: 1
};

experiment_blocks.push(second_trial_procedure);

jsPsych.init({
    timeline: experiment_blocks,
    fullscreen: true,
    on_finish: function () {
        jsPsych.data.displayData();
    }
});

