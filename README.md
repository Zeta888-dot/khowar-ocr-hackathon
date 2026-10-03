# Khowar AI: OCR and Language Modelling for a Low-Resource Language

Khowar is spoken in Chitral and has almost no digital text, because most of it sits in scanned
books and manuscripts. This project builds the first step of a Khowar language stack:
an OCR model that turns scanned Nastaliq pages into digital text, and an early
continued-pretraining (CPT) experiment on that text.

## Models

| Model | Description | Link |
|-------|-------------|------|
| khowar-ocr-v0.1 | DeepSeek-OCR-2 fine-tuned with QLoRA (Unsloth) on ~16k synthetic Nastaliq images | https://huggingface.co/zahidazam714/khowar-ocr-v0.1 |
| qwen-khowar-qlora-v2 | Qwen2.5-0.5B QLoRA CPT trial on ~1.27M Khowar tokens (proof of concept) | https://huggingface.co/zahidazam714/qwen-khowar-qlora-v2 |

## Results

Run `notebooks/04_gradio_demo_cer.ipynb` to reproduce the results, or see `docs/screenshots/`.

CER is computed on whitespace-normalised text with character-level edit distance.
Test texts are not part of the training data.

## Repository layout

- `notebooks/01_train_ocr.ipynb`: OCR fine-tuning
- `notebooks/02_ocr_resume_checkpoint.ipynb`: resuming training from a checkpoint
- `notebooks/03_ocr_inference.ipynb`: inference experiments
- `notebooks/04_gradio_demo_cer.ipynb`: demo UI with live OCR and CER evaluation
- `notebooks/05_cpt_qlora_training.ipynb`: CPT experiment
- `notebooks/06_inference_qlora_v1.ipynb`: CPT inference with perplexity score
- `dataset-pipeline/`: Puppeteer renderer that converts text files into images with labels
- `data/`: dataset description, sample images and the CER test set
- `docs/screenshots/`: demo screenshots

## Run the demo

1. Open `notebooks/04_gradio_demo_cer.ipynb` on Kaggle with a GPU and internet enabled.
2. Add a Hugging Face token where the notebook calls `login(...)`.
3. Upload `data/cer_test/` as a Kaggle dataset, then run all cells.

## Rebuild the dataset
cd dataset-pipeline
npm install

place a Nastaliq font in this folder as font.ttf (fonts are not committed)
add one .txt file per sample to texts/

node render.js
python pack.py


`pack.py` writes `cer-test.zip` with Linux-style (forward slash) paths, which Kaggle and
Colab require. A zip made with Windows tools can contain backslash paths that break there.

## Limitations

- The OCR model has not been trained on the full 16k+ images. Only about 1200 steps have run so far because of limited GPU hardware, so accuracy may vary.
- The CPT adapter is a small trial run and not a usable Khowar language model yet. It is a proof of concept for the pipeline. You can run inference on it with the provided notebook on a free Kaggle or Colab GPU, and `06_inference_qlora_v1.ipynb` also reports the perplexity score. Use your own raw Khowar text for the test, or the hardcoded sample text in the notebook.

## Author

Zahid, NeuraFlix
