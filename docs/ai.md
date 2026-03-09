# AI Architecture

## Objective

Fornecer modelos de visão computacional capazes de detectar padrões industriais através de imagens.

---

## Pipeline

Upload → Storage → Model → Inference → Inspection → Persistência → API Response

---

## Model Strategy

Cada modelo possui:

- versão
- dataset
- métricas
- empresa associada
- módulo associado

---

## Supported Tasks (Inicial)

- Object Detection
- Image Classification

Futuro:

- Segmentation
- Anomaly Detection
- Video Analysis

---

## Tools

- YOLOv8 → treinamento e inference
- Roboflow → dataset e labeling
- Label Studio → alternativa de anotação
