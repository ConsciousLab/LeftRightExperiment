console.log('start task.js');

let experiment_blocks = [];
// experiment_blocks.push(test_animation);
// experiment_blocks.push(poor_animation);

/* define welcome message trial */
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

// defining two different response scales that can be used.
const scale_smart = ["Stupid", "Below average", "Average", "Smart", "Very smart", "Genius"];
const numberScale = [1,2,3,4,5,6,7,8,9,10];

//Ask from the user for details
const StartSurvey = [
    {
        type: "survey-text",
        button_label: 'המשיכי',
        questions: [
        {
            name: 'age',
            prompt: "How old are you?",
            columns: 20,
            rows: 1,
            value: '',
            data: "Age"
        },
        {
            id: 'name',
            prompt: "Name?",
            columns: 20,
            rows: 1,
            required: true,
            value: ''
        },
        {
            id: 'education',
            prompt: "Education?",
            columns: 20,
            rows: 1,
            value: '',
            required: true
        }]
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
        questions: [{prompt: "How smart do you think you are.", labels: numberScale}]
    },
    {
        type: 'survey-likert',
        questions: [{prompt: "How confident do you think you are.", labels: numberScale}]
    }
];
experiment_blocks = experiment_blocks.concat(StartSurvey);

//Trial stimulus
let stimulus = [];
for(let i = 0 ;i < 5; i++){
    stimulus.push({ stimulus: '<div style="font-size:500%;" align="center">left</div>',
            data: {test_part: 'trial', correct_response: 'f'}},
        { stimulus: "<div style=\"font-size:500%;\" align=\"center\">right</div>",
            data: {test_part: 'trial', correct_response: 'j'}})
}
//Trial fixation
const fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div align="center" style="font-size:500%;">+</div>',
    choices: ['f', 'j'],
    data: {test_part: 'fixation'},
};
//Trial component
const trial = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    data: jsPsych.timelineVariable('data'),
    trial_duration: "300",
    on_finish: function(data){
        data.correct = data.key_press === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    }
};
//Trial procedure component
const first_trial_procedure = {
    timeline: [fixation, trial],
    timeline_variables: stimulus,
    randomize_order: true,
    repetitions: 1
};
experiment_blocks.push(first_trial_procedure);

let welcome2 = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};
experiment_blocks.push(welcome2);

let secondStimulus = [];
for(let i = 0 ;i < 5; i++){
    secondStimulus.push(
        { stimulus: '<div style="font-size:500%;" align="center">left</div>',
            data: {test_part: 'trial', correct_response: 'f'}},
        { stimulus: "<div style=\"font-size:500%;\" align=\"center\">right</div>",
            data: {test_part: 'trial', correct_response: 'j'}})
}
for(let i = 0 ;i < 2; i++){
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

