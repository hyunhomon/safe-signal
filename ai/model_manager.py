import torch
from torch.nn import Linear, ReLU, Sigmoid, Sequential, BCELoss

class ModelManager:
    def __init__(self):
        self.model = Sequential(
            Linear(24, 64), ReLU(),
            Linear(64, 32), ReLU(),
            Linear(32, 16), ReLU(),
            Linear(16, 1), Sigmoid()
        )
    
    def load(self, file_path):
        try:
            self.model.load_state_dict(torch.load(file_path, weights_only=True))
            print(f"Model loaded successfully.")
        except Exception as e:
            print(f"Failed to load model: {file_path}. Error: {e}")

    def save(self, save_path):
        try:
            torch.save(self.model.state_dict(), save_path)
            print(f"Model saved successfully to {save_path}.")
        except Exception as e:
            print(f"Error saving model: {e}")
    
    def train(self, X, y, lr=0.001, epochs=200):
        X = torch.tensor(X.values, dtype=torch.float32)
        y = torch.tensor(y.values, dtype=torch.float32)

        self.model.train()
        criterion = BCELoss()
        optimizer = torch.optim.Adam(self.model.parameters(), lr)

        for epoch in range(epochs):
            optimizer.zero_grad()
            outputs = self.model(X).squeeze()
            loss = criterion(outputs, y)
            loss.backward()
            optimizer.step()

            if (epoch+1) % 10 == 0:
                print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')

    def evaluate(self, X, y):
        X = torch.tensor(X.values, dtype=torch.float32)
        y = torch.tensor(y.values, dtype=torch.float32)
        
        self.model.eval()
        with torch.no_grad():
            outputs = self.model(X).squeeze()
        
        log_loss = -torch.mean(y * torch.log(outputs) + (1 - y) * torch.log(1 - outputs))
        brier_score = ((outputs - y) ** 2).mean().item()
        print(f"Log Loss: {log_loss}, Brier Score: {brier_score}")
    
    def predict(self, X):
        X = torch.tensor(X.values, dtype=torch.float32)
        
        self.model.eval()
        with torch.no_grad():
            outputs = self.model(X).squeeze()
        
        result = f'{outputs.item() * 100:.6f}%'
        return result
