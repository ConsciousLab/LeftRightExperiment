console.log('start task.js');

console.log("Enter fullscreen");
//Enter fullscreen
const fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: '<p>This study runs in fullscreen. To switch to full screen mode \
  and start the HIT, press the button below.</p>'
};
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
    }
];
//Trial stimulus
const stimulus = [
    { stimulus: '<div style="font-size:50%;" align="center">left</div>',
        data: {test_part: 'test', correct_response: 'f'}},
    { stimulus: "<div style=\"font-size:50%;\" align=\"center\">right</div>",
        data: {test_part: 'test', correct_response: 'j'}}
];
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
const trial_procedure = {
    timeline: [fixation, trial],
    timeline_variables: stimulus,
    randomize_order: true,
    repetitions: 5
};

let experiment_blocks = [];
// experiment_blocks.push(test_animation);
// experiment_blocks.push(poor_animation);
experiment_blocks.push(fullscreen);
experiment_blocks = experiment_blocks.concat(StartSurvey);
experiment_blocks.push(trial_procedure);

jsPsych.init({
    timeline: experiment_blocks,
    fullscreen: true,
    on_finish: function () {
        jsPsych.data.displayData();
    }
});

