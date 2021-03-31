export const feedbackify = `
    // TODO: Remove this temp file
    // Hide feedback floating button on S & M
    #feedbackify #fbya #fbyb .fby-tab,
    #fby-tab-14912 {
        display: none!important;
    }

    @media (min-width: 976px) {
        #feedbackify #fbya #fbyb .fby-tab,
        #fby-tab-14912 {
            display: block!important;
        }
    }
    body #feedbackify #fby-form {
        position: fixed !important;
        top: 25px !important;
      },
`;
