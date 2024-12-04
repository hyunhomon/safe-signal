import pandas as pd
import matplotlib.pyplot as plt

class DataManager:
    def load(self, file_paths):
        datas = []
        for file_path in file_paths:
            try:
                df = pd.read_spss(file_path)
                datas.append(df)
            except Exception as e:
                print(f"Failed to load file: {file_path}. Error: {e}")

        self.data = pd.concat(datas, ignore_index=True)
        print("Data loaded successfully.")
    
    def save(self, save_path):
        if self.data is None:
            raise ValueError("No data to save. Load data first.")
        
        try:
            self.data.to_csv(save_path, index=False)
            print(f"Data saved successfully to {save_path}.")
        except Exception as e:
            print(f"Error saving data: {e}")
    
    def explore(self):
        if self.data is None:
            raise ValueError("No data to explore. Load data first.")
        
        print("--- Dataset Overview ---")
        print(self.data.info())
        print("\n--- Statistical Summary ---")
        print(self.data.describe())
        print("\n--- Missing Values ---")
        print(self.data.isnull().sum())
    
    def visualize(self):
        if self.data is None:
            raise ValueError("No data to visualize. Load data first.")

        self.data.hist(grid=False)
        plt.show()
    
    def preprocess(self):
        if self.data is None:
            raise ValueError("No data to preprocess. Load data first.")
        
        binary_data = pd.DataFrame({
            'gender': (self.data['SEX'] > 1),
            'breakfast': (self.data['F_BR'] > 1),
            'exercise': (self.data['PA_TOT'] > 1),
            'sleep': (self.data['M_SLP_EN'] > 2),
            'anxiety': (self.data[['M_GAD_1', 'M_GAD_5', 'M_GAD_7']].sum(axis=1) > 7),
            'worry': (self.data[['M_GAD_2', 'M_GAD_3']].sum(axis=1) > 5),
            'anger': (self.data[['M_GAD_4', 'M_GAD_6']].sum(axis=1) > 5),
            'depression': (self.data['M_SAD'] > 1),
            'violence': (self.data['V_TRT'] > 1),
            'thought': self.data['M_SUI_CON'],
            'plan': self.data['M_SUI_PLN'],
            'attempt': self.data['M_SUI_ATT'],
        })
        category_data = pd.DataFrame({
            'age': self.data['GRADE'],
            'stress': self.data['M_STR'],
            'loneliness': self.data['M_LON'],
            'grade': self.data['E_S_RCRD'],
            'economy': self.data['E_SES'],
            'residence': self.data['E_RES'],
        })
        columns = [
            'gender', 'age', 'breakfast', 'exercise', 'stress', 'loneliness', 'sleep', 'anxiety', 'worry', 'anger', 'depression', 'violence', 'grade', 'economy', 'residence', 'thought', 'plan', 'attempt'
        ]
        self.data = pd.concat([binary_data, category_data], axis=1)
        self.data.dropna(inplace=True)
        self.data = self.data.astype(int).reindex(columns=columns)
        self.data = pd.get_dummies(self.data, columns=['age', 'residence'], dtype=int)
        risk_weights = {'thought': 0.2, 'plan': 0.3, 'attempt': 0.5}
        self.data['risk'] = (
            self.data['thought'] * risk_weights['thought'] +
            self.data['plan'] * risk_weights['plan'] +
            self.data['attempt'] * risk_weights['attempt'] - 1
        )
        self.data.drop(columns=['thought', 'plan', 'attempt'], inplace=True)

        print("Preprocessing completed.")
    
    def split(self):
        if self.data is None:
            raise ValueError("No data to split. Load data first.")
        
        if 'risk' not in self.data.columns:
            raise ValueError(f"Target column 'risk' not found in data. Preprocess data first.")
        
        X = self.data.drop(columns=['risk'])
        y = self.data['risk']
        return X, y
