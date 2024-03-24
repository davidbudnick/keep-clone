package handlers_test

import (
	"net/http"
	"net/http/httptest"
	"server/constants"
	"server/internal/handlers"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestRegister(t *testing.T) {
	type args struct {
		endpoint string
		r        *gin.Engine
	}
	tests := []struct {
		name           string
		args           args
		expectedStatus int
		expectedBody   string
	}{
		{
			name:           "TestRegisterInternalEndpoint",
			args:           args{constants.ENDPOINT_HEALTH_INTERNAL, gin.Default()},
			expectedStatus: http.StatusOK,
			expectedBody:   `{"status":"ok"}`,
		},
		{
			name:           "TestRegisterExternalEndpoint",
			args:           args{constants.ENDPOINT_HEALTH_EXTERNAL, gin.Default()},
			expectedStatus: http.StatusOK,
			expectedBody:   `{"status":"ok"}`,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			handlers.Register(tt.args.endpoint, tt.args.r)

			w := httptest.NewRecorder()
			req, _ := http.NewRequest("GET", tt.args.endpoint, nil)

			tt.args.r.ServeHTTP(w, req)

			if w.Code != tt.expectedStatus {
				t.Errorf("Expected status code %d, got %d", tt.expectedStatus, w.Code)
			}

			if w.Body.String() != tt.expectedBody {
				t.Errorf("Expected body %s, got %s", tt.expectedBody, w.Body.String())
			}
		})
	}
}
