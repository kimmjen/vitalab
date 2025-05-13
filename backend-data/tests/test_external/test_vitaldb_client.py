# tests/test_external/test_vitaldb_client.py
from pprint import pprint

import pytest
import pandas as pd
from src.infrastructure.external.vitaldb_client import VitalDBClient


@pytest.mark.asyncio
class TestVitalDBClient:
    async def test_get_cases_should_return_dataframe_with_correct_columns(
            self,
            vitaldb_client: VitalDBClient
    ):
        # When
        df = await vitaldb_client.get_cases()

        # Then
        required_columns = [
            'caseid', 'subjectid', 'age', 'sex', 'height', 'weight',
            'department', 'optype', 'dx', 'opname'
        ]
        assert isinstance(df, pd.DataFrame)
        assert not df.empty
        assert all(col in df.columns for col in required_columns)

        # Data type validation
        assert df['caseid'].dtype == 'int64'
        # Data type validation - float으로 수정
        assert df['age'].dtype == 'float64'  # int64에서 float64로 변경
        assert df['sex'].isin(['M', 'F']).all()
        assert df['height'].dtype == 'float64'
        assert df['weight'].dtype == 'float64'

    async def test_get_tracks_should_return_dataframe_with_correct_format(
            self,
            vitaldb_client: VitalDBClient
    ):
        # When
        df = await vitaldb_client.get_tracks()
        print(df)
        # Then
        required_columns = ['caseid', 'tname', 'tid']
        assert isinstance(df, pd.DataFrame)
        assert not df.empty
        assert all(col in df.columns for col in required_columns)

        # Validate track ID format
        assert df['tid'].str.match(r'^[a-f0-9]{40}$').all()
        assert df['caseid'].dtype == 'int64'

    async def test_get_track_data_should_return_valid_time_series(
            self,
            vitaldb_client: VitalDBClient
    ):
        # Given
        tracks_df = await vitaldb_client.get_tracks()
        first_tid = tracks_df.iloc[0]['tid']

        # When
        df = await vitaldb_client.get_track_data(first_tid)

        # Then
        assert isinstance(df, pd.DataFrame)
        assert not df.empty
        assert df.shape[1] == 2  # Time and Value columns

        # Validate time series properties
        time_col = df.iloc[:, 0]
        assert time_col.is_monotonic_increasing
        assert pd.to_numeric(df.iloc[:, 1], errors='coerce').notna().all()

    async def test_get_labs_should_return_dataframe_with_valid_results(
            self,
            vitaldb_client: VitalDBClient
    ):
        # When
        df = await vitaldb_client.get_labs()

        # Then
        required_columns = ['caseid', 'dt', 'name', 'result']
        assert isinstance(df, pd.DataFrame)
        assert not df.empty
        assert all(col in df.columns for col in required_columns)

        # Validate data types and values
        assert df['caseid'].dtype == 'int64'
        assert df['dt'].dtype == 'int64'
        assert pd.to_numeric(df['result'], errors='coerce').notna().all()