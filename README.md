# Khowar AI: OCR and Language Modelling for a Low-Resource Language

Khowar is spoken in Chitral and has almost no digital text, because most of it sits in scanned
books and manuscripts. This project builds the first step of a Khowar language stack:
an OCR model that turns scanned Nastaliq pages into digital text, and an early
continued-pretraining (CPT) experiment on that text.

## Models

| Model | Description | Link |
|-------|-------------|------|
| khowar-ocr-v0.1 | DeepSeek-OCR-2 fine-tuned with QLoRA (Unsloth) on ~16k synthetic Nastaliq images | https://huggingface.co/zahidazam714/khowar-ocr-v0.1 |
| qwen-khowar-qlora | Qwen2.5-0.5B QLoRA CPT trial on ~1.27M Khowar tokens (proof of concept) | https://huggingface.co/zahidazam714/qwen-khowar-qlora-v2 |

## Results

Run the 04_gradio_demo_cer.ipynb and see the results yourself or read the screenshots floder to see the results.

CER is computed on whitespace-normalised text with character-level edit distance.
Test texts are not part of the training data.

## Repository layout

- `notebooks/01_ocr_training.ipynb`: OCR fine-tuning
- `notebooks/02_ocr_resume_checkpoint.ipynb`: resuming training from a checkpoint
- `notebooks/03_ocr_inference.ipynb`: inference experiments
- `notebooks/04_gradio_demo_cer.ipynb`: demo UI with live OCR and CER evaluation
- `notebooks/05_cpt_qlora_training.ipynb`: CPT experiment
- `notebooks/06_inference_qlora_v1.ipynb`: CPT inference with perplexity score
- `dataset_pipeline/`: Puppeteer renderer that converts text files into images with labels
- `data/`: dataset description, sample images and the CER test set
- `docs/screenshots/`: demo screenshots

## Run the demo

1. Open `notebooks/04_gradio_demo_cer.ipynb` on Kaggle with a GPU and internet enabled.
2. Add a Hugging Face token where the notebook calls `login(...)`.
3. Upload `data/cer_test/` as a Kaggle dataset, then run all cells.

## Rebuild the dataset

    cd dataset_pipeline
    npm install
    # put a Nastaliq font at fonts/font.ttf (copy it to the working directory as font.ttf)
    # add text files to texts/
    node render.js
    # Before uploading to dataset make sure to zip the dataset and use slashses according to linux because kaggles and google colab are both  linux based.

    

## Limitations

- The OCR model is not completely trained on the 16 thousand plus images - only 1200 + steps have been run so far because of hardware scarcity; accuracy may vary.
- The CPT adapter is a small trial run, not a usable Khowar language model yet hence it is a proof of concept that we did it , you can do inference on the CPT model on your own kaggele or colab free tier GPUs using our uploaded notebook - you can also check the perplexity score of the qlora cpt model using the 06_inference_qlora_v1.ipynb but make sure you have enough text khowar raw text to the the infernence or you can simply use the hardcoded text in the notebook.

## Zahid, NeuraFlix

