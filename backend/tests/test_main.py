"""
Basic tests for NNIT AI Enterprise Backend
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root_endpoint():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "NNIT AI Enterprise API"
    assert data["owner"] == "Solomon Omomeje Ayodele"
    assert data["company"] == "Network Nice IT Tec (NNIT)"


def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "services" in data


def test_api_docs():
    """Test API documentation endpoint"""
    response = client.get("/docs")
    assert response.status_code == 200
