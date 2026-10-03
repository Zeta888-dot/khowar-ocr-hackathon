# Data

## Training dataset (~16k image-label pairs)

Synthetic Khowar Nastaliq line/paragraph images with ground-truth text, generated with the
Puppeteer pipeline in `dataset_pipeline/` and augmented with Albumentations using raw khowar text.

Full dataset: <can't share here sir! alredy shared the smaples how the dataset looks like>

Record format (JSONL, one sample per line):

    {"messages": [
        {"role": "user", "content": [{"type": "image", "image": "images/000001.png"}]},
        {"role": "assistant", "content": "<ground-truth Khowar text>"}
    ]}

## Included in this repository

- `training_samples/`: a small subset to show what the data looks like
- `cer_test/`: held-out rendered samples used by the CER evaluation in the demo notebook