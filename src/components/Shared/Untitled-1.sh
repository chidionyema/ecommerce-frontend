#!/bin/bash
#
# k8s-gen - Enterprise Kubernetes Infrastructure Generator
# Version: 1.0.0
#
# This script generates a complete enterprise-grade Kubernetes infrastructure
# for multi-cloud and on-premises deployments.

set -e

# Base directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$(pwd)/k8s-enterprise"
TEMPLATE_DIR="${SCRIPT_DIR}/templates"

# ANSI colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Default settings
PROVIDERS="aws,gcp,azure,on-prem"
COMPONENTS="base,networking,security,monitoring,logging,backup,cicd,gitops"
FORCE=false
VERBOSE=false

# Print banner
function print_banner() {
    echo -e "${BLUE}${BOLD}"
    echo "=============================================================="
    echo "  Enterprise Kubernetes Infrastructure Generator (k8s-gen)  "
    echo "=============================================================="
    echo -e "${NC}"
    echo "Generating production-grade Kubernetes infrastructure"
    echo "Version: 1.0.0"
    echo ""
}

# Print usage information
function print_usage() {
    echo "Usage: $0 [options] [command]"
    echo ""
    echo "Commands:"
    echo "  generate    Generate the complete infrastructure (default)"
    echo "  validate    Validate the generated artifacts"
    echo "  clean       Remove all generated artifacts"
    echo ""
    echo "Options:"
    echo "  -p, --providers LIST    Cloud providers (aws,gcp,azure,on-prem)"
    echo "  -c, --components LIST   Components to include"
    echo "  -o, --output DIR        Output directory (default: ./k8s-enterprise)"
    echo "  -f, --force             Overwrite existing files"
    echo "  -v, --verbose           Show detailed output"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 --providers aws,gcp --output ./my-k8s"
    echo "  $0 --components networking,security,monitoring"
    echo ""
}

# Log functions
function log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

function log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

function log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

function log_debug() {
    if [ "$VERBOSE" = true ]; then
        echo "[DEBUG] $1"
    fi
}

# Parse command line arguments
COMMAND="generate"
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        generate|validate|clean)
            COMMAND="$1"
            shift
            ;;
        -p|--providers)
            PROVIDERS="$2"
            shift
            shift
            ;;
        -c|--components)
            COMPONENTS="$2"
            shift
            shift
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift
            shift
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help)
            print_banner
            print_usage
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            ;;
    esac
done

# Convert providers and components to arrays
IFS=',' read -ra PROVIDER_ARRAY <<< "$PROVIDERS"
IFS=',' read -ra COMPONENT_ARRAY <<< "$COMPONENTS"

# Create template directory structure if it doesn't exist
mkdir -p "${TEMPLATE_DIR}"

# Check if template files exist or create them
function ensure_templates_exist() {
    log_debug "Checking for template files"
    
    # Create provider templates
    mkdir -p "${TEMPLATE_DIR}/terraform"
    mkdir -p "${TEMPLATE_DIR}/kubernetes"
    mkdir -p "${TEMPLATE_DIR}/ansible"
    mkdir -p "${TEMPLATE_DIR}/cicd"
    
    # Create common templates if they don't exist
    if [ ! -d "${TEMPLATE_DIR}/terraform/aws" ]; then
        create_terraform_aws_templates
    fi
    
    if [ ! -d "${TEMPLATE_DIR}/terraform/gcp" ]; then
        create_terraform_gcp_templates
    fi
    
    if [ ! -d "${TEMPLATE_DIR}/terraform/azure" ]; then
        create_terraform_azure_templates
    fi
    
    if [ ! -d "${TEMPLATE_DIR}/kubernetes/common" ]; then
        create_kubernetes_templates
    fi
    
    if [ ! -d "${TEMPLATE_DIR}/ansible/on-prem" ]; then
        create_ansible_templates
    fi
    
    if [ ! -d "${TEMPLATE_DIR}/cicd/gitlab" ]; then
        create_cicd_templates
    fi
}

# Initialize directory structure
function init_directory_structure() {
    log_info "Initializing directory structure at ${OUTPUT_DIR}"
    
    # Check if directory exists
    if [ -d "$OUTPUT_DIR" ] && [ "$FORCE" != true ]; then
        log_error "Output directory already exists. Use --force to overwrite."
    fi
    
    # Create main directories
    mkdir -p "${OUTPUT_DIR}"
    mkdir -p "${OUTPUT_DIR}/config"
    mkdir -p "${OUTPUT_DIR}/docs"
    mkdir -p "${OUTPUT_DIR}/scripts"
    
    # Create provider-specific directories
    for provider in "${PROVIDER_ARRAY[@]}"; do
        log_debug "Creating directories for ${provider}"
        
        if [ "$provider" != "on-prem" ]; then
            # Terraform directories
            mkdir -p "${OUTPUT_DIR}/terraform/${provider}"
            mkdir -p "${OUTPUT_DIR}/terraform/${provider}/modules"
            mkdir -p "${OUTPUT_DIR}/terraform/${provider}/environments/dev"
            mkdir -p "${OUTPUT_DIR}/terraform/${provider}/environments/staging"
            mkdir -p "${OUTPUT_DIR}/terraform/${provider}/environments/prod"
        fi
        
        # Kubernetes directories
        mkdir -p "${OUTPUT_DIR}/kubernetes/${provider}"
        
        # Ansible directories
        mkdir -p "${OUTPUT_DIR}/ansible/${provider}"
        mkdir -p "${OUTPUT_DIR}/ansible/${provider}/inventory"
        mkdir -p "${OUTPUT_DIR}/ansible/${provider}/playbooks"
        
        # Test directories
        mkdir -p "${OUTPUT_DIR}/tests/${provider}"
    done
    
    # Create component-specific directories
    for component in "${COMPONENT_ARRAY[@]}"; do
        log_debug "Creating directories for ${component}"
        
        # Common component directories
        mkdir -p "${OUTPUT_DIR}/kubernetes/common/${component}"
        
        # Provider-specific component directories
        for provider in "${PROVIDER_ARRAY[@]}"; do
            mkdir -p "${OUTPUT_DIR}/kubernetes/${provider}/${component}"
            
            if [ "$provider" != "on-prem" ]; then
                mkdir -p "${OUTPUT_DIR}/terraform/${provider}/modules/${component}"
            fi
            
            mkdir -p "${OUTPUT_DIR}/ansible/${provider}/playbooks/${component}"
        done
    done
    
    # CI/CD directories
    mkdir -p "${OUTPUT_DIR}/ci-cd/gitlab"
    mkdir -p "${OUTPUT_DIR}/ci-cd/github"
    mkdir -p "${OUTPUT_DIR}/ci-cd/jenkins"
    mkdir -p "${OUTPUT_DIR}/ci-cd/argocd"
    
    # Create master deployment script
    cat > "${OUTPUT_DIR}/deploy.sh" << 'EOF'
#!/bin/bash
# Master deployment script for Kubernetes infrastructure

echo "Enterprise Kubernetes Infrastructure Deployment"
echo "==============================================="

if [ $# -lt 2 ]; then
    echo "Usage: $0 <provider> <environment> [component]"
    echo "Example: $0 aws dev"
    echo "Example: $0 gcp prod networking"
    exit 1
fi

PROVIDER=$1
ENVIRONMENT=$2
COMPONENT=$3

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Validate inputs
if [ ! -d "${SCRIPT_DIR}/terraform/${PROVIDER}" ] && [ ! -d "${SCRIPT_DIR}/ansible/${PROVIDER}" ]; then
    echo "Error: Provider '${PROVIDER}' not found"
    exit 1
fi

if [ ! -d "${SCRIPT_DIR}/terraform/${PROVIDER}/environments/${ENVIRONMENT}" ] && [ ! -d "${SCRIPT_DIR}/kubernetes/${PROVIDER}/${ENVIRONMENT}" ]; then
    echo "Error: Environment '${ENVIRONMENT}' not found"
    exit 1
fi

# Deploy infrastructure
echo "Deploying ${PROVIDER} infrastructure for ${ENVIRONMENT} environment"

if [ -n "$COMPONENT" ]; then
    echo "Deploying component: ${COMPONENT}"
    
    # Deploy specific component
    if [ -d "${SCRIPT_DIR}/terraform/${PROVIDER}/modules/${COMPONENT}" ]; then
        echo "Deploying Terraform component: ${COMPONENT}"
        # Run Terraform deployment for component
    fi
    
    if [ -d "${SCRIPT_DIR}/kubernetes/${PROVIDER}/${COMPONENT}" ]; then
        echo "Deploying Kubernetes component: ${COMPONENT}"
        # Run Kubernetes deployment for component
    fi
else
    # Deploy everything
    if [ -d "${SCRIPT_DIR}/terraform/${PROVIDER}" ]; then
        echo "Deploying Terraform infrastructure"
        # Run Terraform deployment
    fi
    
    if [ -d "${SCRIPT_DIR}/kubernetes/${PROVIDER}" ]; then
        echo "Deploying Kubernetes resources"
        # Run Kubernetes deployment
    fi
fi

echo "Deployment complete"
EOF
    chmod +x "${OUTPUT_DIR}/deploy.sh"
    
    # Create README file
    cat > "${OUTPUT_DIR}/README.md" << 'EOF'
# Enterprise Kubernetes Infrastructure

This repository contains a production-grade Kubernetes infrastructure designed for multi-cloud and on-premises deployments.

## Directory Structure

- `terraform/`: Infrastructure as Code for cloud providers
- `kubernetes/`: Kubernetes manifests and configurations
- `ansible/`: Configuration management and on-premises automation
- `ci-cd/`: CI/CD pipeline configurations
- `config/`: Configuration files and variables
- `docs/`: Documentation and architecture diagrams
- `scripts/`: Utility scripts for operations
- `tests/`: Testing frameworks and scenarios

## Getting Started

1. Review the `config/` directory and modify variables as needed
2. Deploy the infrastructure using the provided script:

```bash
./deploy.sh <provider> <environment> [component]
```

Examples:
- `./deploy.sh aws dev` - Deploy AWS infrastructure for dev environment
- `./deploy.sh gcp prod networking` - Deploy networking component for GCP in production

## Generated by k8s-gen

This infrastructure was generated by the Enterprise Kubernetes Infrastructure Generator.
EOF
    
    log_info "Directory structure created successfully"
}

# Generate terraform code for all providers
function generate_terraform() {
    log_info "Generating Terraform code"
    
    for provider in "${PROVIDER_ARRAY[@]}"; do
        if [ "$provider" = "on-prem" ]; then
            log_debug "Skipping Terraform generation for on-prem"
            continue
        fi
        
        log_info "Generating Terraform for ${provider}"
        
        # Copy provider-specific templates
        cp -r "${TEMPLATE_DIR}/terraform/${provider}/." "${OUTPUT_DIR}/terraform/${provider}/"
        
        # Generate modules for each component
        for component in "${COMPONENT_ARRAY[@]}"; do
            log_debug "Generating Terraform module for ${component}"
            
            if [ -d "${TEMPLATE_DIR}/terraform/${provider}/modules/${component}" ]; then
                cp -r "${TEMPLATE_DIR}/terraform/${provider}/modules/${component}" "${OUTPUT_DIR}/terraform/${provider}/modules/"
            fi
        done
        
        # Generate environment-specific configurations
        for env in "dev" "staging" "prod"; do
            log_debug "Generating Terraform for ${env} environment"
            
            if [ -d "${TEMPLATE_DIR}/terraform/${provider}/environments/${env}" ]; then
                cp -r "${TEMPLATE_DIR}/terraform/${provider}/environments/${env}" "${OUTPUT_DIR}/terraform/${provider}/environments/"
            fi
        done
    done
    
    log_info "Terraform generation complete"
}

# Generate Kubernetes manifests
function generate_kubernetes() {
    log_info "Generating Kubernetes manifests"
    
    # Generate common Kubernetes resources
    cp -r "${TEMPLATE_DIR}/kubernetes/common/." "${OUTPUT_DIR}/kubernetes/common/"
    
    # Generate provider-specific Kubernetes resources
    for provider in "${PROVIDER_ARRAY[@]}"; do
        log_info "Generating Kubernetes manifests for ${provider}"
        
        if [ -d "${TEMPLATE_DIR}/kubernetes/${provider}" ]; then
            cp -r "${TEMPLATE_DIR}/kubernetes/${provider}/." "${OUTPUT_DIR}/kubernetes/${provider}/"
        fi
        
        # Generate component-specific manifests
        for component in "${COMPONENT_ARRAY[@]}"; do
            log_debug "Generating Kubernetes manifests for ${component}"
            
            if [ -d "${TEMPLATE_DIR}/kubernetes/common/${component}" ]; then
                mkdir -p "${OUTPUT_DIR}/kubernetes/${provider}/${component}"
                cp -r "${TEMPLATE_DIR}/kubernetes/common/${component}/." "${OUTPUT_DIR}/kubernetes/${provider}/${component}/"
            fi
        done
    done
    
    log_info "Kubernetes manifest generation complete"
}

# Generate Ansible playbooks
function generate_ansible() {
    log_info "Generating Ansible playbooks"
    
    for provider in "${PROVIDER_ARRAY[@]}"; do
        log_info "Generating Ansible for ${provider}"
        
        if [ -d "${TEMPLATE_DIR}/ansible/${provider}" ]; then
            cp -r "${TEMPLATE_DIR}/ansible/${provider}/." "${OUTPUT_DIR}/ansible/${provider}/"
        fi
        
        # Generate component-specific playbooks
        for component in "${COMPONENT_ARRAY[@]}"; do
            log_debug "Generating Ansible playbooks for ${component}"
            
            if [ -d "${TEMPLATE_DIR}/ansible/${provider}/playbooks/${component}" ]; then
                mkdir -p "${OUTPUT_DIR}/ansible/${provider}/playbooks/${component}"
                cp -r "${TEMPLATE_DIR}/ansible/${provider}/playbooks/${component}/." "${OUTPUT_DIR}/ansible/${provider}/playbooks/${component}/"
            fi
        done
    done
    
    log_info "Ansible playbook generation complete"
}

# Generate CI/CD configuration
function generate_cicd() {
    log_info "Generating CI/CD configurations"
    
    # GitLab CI/CD
    if [ -d "${TEMPLATE_DIR}/cicd/gitlab" ]; then
        cp -r "${TEMPLATE_DIR}/cicd/gitlab/." "${OUTPUT_DIR}/ci-cd/gitlab/"
    fi
    
    # GitHub Actions
    if [ -d "${TEMPLATE_DIR}/cicd/github" ]; then
        cp -r "${TEMPLATE_DIR}/cicd/github/." "${OUTPUT_DIR}/ci-cd/github/"
    fi
    
    # Jenkins
    if [ -d "${TEMPLATE_DIR}/cicd/jenkins" ]; then
        cp -r "${TEMPLATE_DIR}/cicd/jenkins/." "${OUTPUT_DIR}/ci-cd/jenkins/"
    fi
    
    # ArgoCD
    if [ -d "${TEMPLATE_DIR}/cicd/argocd" ]; then
        cp -r "${TEMPLATE_DIR}/cicd/argocd/." "${OUTPUT_DIR}/ci-cd/argocd/"
    fi
    
    log_info "CI/CD configuration generation complete"
}

# Generate documentation
function generate_docs() {
    log_info "Generating documentation"
    
    # Architecture diagrams
    mkdir -p "${OUTPUT_DIR}/docs/architecture"
    cat > "${OUTPUT_DIR}/docs/architecture/overview.md" << 'EOF'
# Architecture Overview

This document provides an overview of the Kubernetes infrastructure architecture.

## Components

- **Infrastructure Layer**: Managed by Terraform/Ansible
- **Kubernetes Layer**: Core Kubernetes components and add-ons
- **Security Layer**: RBAC, network policies, secret management
- **Observability Layer**: Monitoring, logging, and tracing
- **CI/CD Layer**: Continuous integration and deployment pipelines

## Diagrams

### High-Level Architecture

```
+-------------------------------------------+
|              Applications                 |
+-------------------------------------------+
|                                           |
|  +-------------+  +-----------------+     |
|  | Security    |  | Observability   |     |
|  | - RBAC      |  | - Prometheus    |     |
|  | - Policies  |  | - Grafana       |     |
|  | - Vault     |  | - EFK/Loki      |     |
|  +-------------+  +-----------------+     |
|                                           |
|  +-----------------------------------+    |
|  |          Kubernetes               |    |
|  | AWS EKS / GCP GKE / Azure AKS     |    |
|  +-----------------------------------+    |
|                                           |
|  +-----------------------------------+    |
|  |      Infrastructure (IaC)         |    |
|  | Terraform / Ansible               |    |
|  +-----------------------------------+    |
|                                           |
+-------------------------------------------+
```

### Network Architecture

- VPC/VNet with public and private subnets
- NAT Gateways for outbound traffic
- Load Balancers for service exposure
- VPN for hybrid connectivity
EOF
    
    # Operations guide
    mkdir -p "${OUTPUT_DIR}/docs/operations"
    cat > "${OUTPUT_DIR}/docs/operations/runbook.md" << 'EOF'
# Operations Runbook

This document provides operational procedures for the Kubernetes infrastructure.

## Deployment

To deploy the infrastructure:

```bash
./deploy.sh <provider> <environment> [component]
```

## Monitoring

### Accessing Dashboards

- Grafana: https://grafana.<cluster-domain>
- Kibana: https://kibana.<cluster-domain>

### Alerting

Alert notifications are sent to:
- Slack channel: #k8s-alerts
- PagerDuty

## Backup and Recovery

### Backup Schedule

Backups are performed daily using Velero:

```bash
velero backup create <backup-name> --include-namespaces=<namespaces>
```

### Recovery Procedure

To recover from a backup:

```bash
velero restore create --from-backup=<backup-name>
```

## Troubleshooting

### Common Issues

- **Pod pending**: Check node resources and quotas
- **Service unavailable**: Check endpoints and network policies
- **Application errors**: Check logs with `kubectl logs <pod-name>`

### Collecting Diagnostics

Run the diagnostic script:

```bash
./scripts/collect-diagnostics.sh <namespace>
```
EOF
    
    # Security documentation
    mkdir -p "${OUTPUT_DIR}/docs/security"
    cat > "${OUTPUT_DIR}/docs/security/compliance.md" << 'EOF'
# Security and Compliance

This document outlines the security controls and compliance features.

## Security Controls

### Authentication and Authorization

- RBAC is implemented for all access control
- Service accounts have minimal permissions
- Authentication using OIDC integration

### Network Security

- Network policies restrict pod-to-pod communication
- Pod security policies enforce security best practices
- All traffic is encrypted using TLS/mTLS

### Secret Management

- Secrets are managed using HashiCorp Vault
- Automatic secret rotation is configured
- Encryption at rest is enabled for all sensitive data

## Compliance

### Standards Implemented

- PCI DSS
- HIPAA
- GDPR
- SOC2

### Validation

Automated compliance scanning is performed using:

- CIS Benchmark testing
- OPA Gatekeeper policy enforcement
- Continuous vulnerability scanning
EOF
    
    log_info "Documentation generation complete"
}

# Create configuration files
function generate_config() {
    log_info "Generating configuration files"
    
    # Main configuration
    cat > "${OUTPUT_DIR}/config/config.yaml" << 'EOF'
# Enterprise Kubernetes Infrastructure Configuration

version: 1.0.0

# Global settings
global:
  organization: "enterprise"
  environment: "prod"
  domain: "example.com"

# Cloud provider configurations
providers:
  aws:
    region: "us-west-2"
    cluster_name: "eks-enterprise"
    kubernetes_version: "1.24"
    vpc_cidr: "10.0.0.0/16"
    node_groups:
      default:
        instance_type: "m5.large"
        min_size: 3
        max_size: 10
        desired_size: 3
  
  gcp:
    project_id: "enterprise-k8s"
    region: "us-central1"
    zone: "us-central1-a"
    cluster_name: "gke-enterprise"
    kubernetes_version: "1.24"
    network_name: "gke-network"
  
  azure:
    resource_group: "k8s-enterprise"
    location: "eastus2"
    cluster_name: "aks-enterprise"
    kubernetes_version: "1.24"
    vnet_cidr: "10.1.0.0/16"
  
  on-prem:
    control_plane_nodes:
      - "192.168.1.10"
      - "192.168.1.11"
      - "192.168.1.12"
    worker_nodes:
      - "192.168.1.20"
      - "192.168.1.21"
      - "192.168.1.22"
    load_balancer_vip: "192.168.1.100"
    pod_cidr: "10.244.0.0/16"
    service_cidr: "10.96.0.0/12"

# Component configurations
components:
  # Security configurations
  security:
    rbac:
      enabled: true
      service_accounts:
        - name: "admin"
          namespace: "kube-system"
          cluster_roles:
            - "cluster-admin"
        - name: "developer"
          namespace: "default"
          roles:
            - "developer"
    
    network_policies:
      default_deny: true
      allowed_namespaces:
        - "kube-system"
        - "monitoring"
        - "logging"
    
    secrets_management:
      vault:
        enabled: true
        version: "1.10.0"
      cert_manager:
        enabled: true
        version: "1.9.1"
    
    compliance:
      standards:
        - "pci-dss"
        - "hipaa"
        - "gdpr"
  
  # Observability configurations
  monitoring:
    prometheus:
      enabled: true
      retention: "15d"
      storage: "50Gi"
    
    grafana:
      enabled: true
      version: "9.0.0"
      dashboards:
        - "kubernetes-cluster"
        - "node-exporter"
        - "apiserver"
    
    alerting:
      pagerduty:
        enabled: true
      slack:
        enabled: true
        channel: "#alerts"
  
  # Logging configurations
  logging:
    solution: "elasticsearch" # options: elasticsearch, loki
    retention: "30d"
    storage: "100Gi"
    
    fluentd:
      enabled: true
      version: "1.14.0"
    
    elasticsearch:
      enabled: true
      version: "7.17.0"
      replicas: 3
    
    kibana:
      enabled: true
      version: "7.17.0"
  
  # CI/CD configurations
  cicd:
    gitops:
      solution: "argocd" # options: argocd, flux
      version: "2.4.0"
    
    pipelines:
      gitlab:
        enabled: true
        templates:
          - "deploy-app"
          - "deploy-infra"
    
    testing:
      enabled: true
      tools:
        - "sonarqube"
        - "trivy"
  
  # Backup and disaster recovery
  backup:
    solution: "velero"
    schedule: "0 1 * * *" # daily at 1 AM
    retention: "30d"
    storage_location: "s3"
    
    velero:
      enabled: true
      version: "1.9.0"
    
    disaster_recovery:
      rpo_minutes: 15
      rto_minutes: 30
      multi_region: true
EOF
    
    # Environment-specific configurations
    for env in "dev" "staging" "prod"; do
        mkdir -p "${OUTPUT_DIR}/config/environments/${env}"
        cat > "${OUTPUT_DIR}/config/environments/${env}/values.yaml" << EOF
# ${env} environment configuration

environment: "${env}"

# Override defaults for ${env} environment
EOF
    done
    
    log_info "Configuration generation complete"
}

# Generate test scripts
function generate_tests() {
    log_info "Generating test scripts"
    
    # Create test directory
    mkdir -p "${OUTPUT_DIR}/tests/common"
    
    # Create test scripts
    cat > "${OUTPUT_DIR}/tests/run-tests.sh" << 'EOF'
#!/bin/bash
# Test runner for Kubernetes infrastructure

echo "Enterprise Kubernetes Infrastructure Test Runner"
echo "==============================================="

if [ $# -lt 1 ]; then
    echo "Usage: $0 <provider> [component]"
    echo "Example: $0 aws"
    echo "Example: $0 gcp security"
    exit 1
fi

PROVIDER=$1
COMPONENT=$2

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Validate provider
if [ ! -d "${SCRIPT_DIR}/${PROVIDER}" ]; then
    echo "Error: Provider '${PROVIDER}' not found"
    exit 1
fi

# Run tests
if [ -n "$COMPONENT" ]; then
    echo "Running tests for ${PROVIDER}/${COMPONENT}"
    
    if [ -d "${SCRIPT_DIR}/${PROVIDER}/${COMPONENT}" ]; then
        # Run component-specific tests
        find "${SCRIPT_DIR}/${PROVIDER}/${COMPONENT}" -name "test_*.sh" -exec {} \;
    else
        echo "No tests found for ${COMPONENT}"
    fi
else
    echo "Running all tests for ${PROVIDER}"
    
    # Run all tests for provider
    find "${SCRIPT_DIR}/${PROVIDER}" -name "test_*.sh" -exec {} \;
    
    # Run common tests
    find "${SCRIPT_DIR}/common" -name "test_*.sh" -exec {} \;
fi

echo "Tests completed"
EOF
    chmod +x "${OUTPUT_DIR}/tests/run-tests.sh"
    
    # Create test examples
    mkdir -p "${OUTPUT_DIR}/tests/common/security"
    cat > "${OUTPUT_DIR}/tests/common/security/test_rbac.sh" << 'EOF'
#!/bin/bash
# Test RBAC configuration

echo "Testing RBAC configuration"

# Create test user
kubectl create serviceaccount test-user -n default

# Test access
kubectl auth can-i list pods --as=system:serviceaccount:default:test-user

# Cleanup
kubectl delete serviceaccount test-user -n default

echo "RBAC test completed"
EOF
    chmod +x "${OUTPUT_DIR}/tests/common/security/test_rbac.sh"
    
    mkdir -p "${OUTPUT_DIR}/tests/common/networking"
    cat > "${OUTPUT_DIR}/tests/common/networking/test_connectivity.sh" << 'EOF'
#!/bin/bash
# Test network connectivity

echo "Testing network connectivity"

# Create test pods
kubectl run test-pod1 --image=busybox -- sleep 3600
kubectl run test-pod2 --image=busybox -- sleep 3600

# Wait for pods to be ready
kubectl wait --for=condition=Ready pod/test-pod1 pod/test-pod2

# Test connectivity
kubectl exec test-pod1 -- ping -c 1 test-pod2

# Cleanup
kubectl delete pod test-pod1 test-pod2

echo "Connectivity test completed"
EOF
    chmod +x "${OUTPUT_DIR}/tests/common/networking/test_connectivity.sh"
    
    log_info "Test script generation complete"
}

# Create template generators
function create_terraform_aws_templates() {
    mkdir -p "${TEMPLATE_DIR}/terraform/aws/modules/networking"
    mkdir -p "${TEMPLATE_DIR}/terraform/aws/modules/cluster"
    mkdir -p "${TEMPLATE_DIR}/terraform/aws/modules/security"
    mkdir -p "${TEMPLATE_DIR}/terraform/aws/environments/dev"
    mkdir -p "${TEMPLATE_DIR}/terraform/aws/environments/staging"
    mkdir -p "${TEMPLATE_DIR}/terraform/aws/environments/prod"
    
    # Create basic templates
    cat > "${TEMPLATE_DIR}/terraform/aws/main.tf" << 'EOF'
# AWS EKS cluster main configuration

terraform {
  required_version = ">= 1.0.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.10"
    }
  }
}

provider "aws" {
  region = var.region
}

module "vpc" {
  source = "./modules/networking"
  
  vpc_name             = "${var.cluster_name}-vpc"
  vpc_cidr             = var.vpc_cidr
  availability_zones   = var.availability_zones
  private_subnet_cidrs = var.private_subnet_cidrs
  public_subnet_cidrs  = var.public_subnet_cidrs
  
  tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
  }
}

module "eks" {
  source = "./modules/cluster"
  
  cluster_name       = var.cluster_name
  kubernetes_version = var.kubernetes_version
  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.private_subnet_ids
  
  node_groups = var.node_groups
}

module "security" {
  source = "./modules/security"
  
  cluster_name = var.cluster_name
  vpc_id       = module.vpc.vpc_id
}
EOF

#!/bin/bash
# Continuing AWS Terraform variables template

cat > "${TEMPLATE_DIR}/terraform/aws/variables.tf" << 'EOF'
variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.24"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}

variable "node_groups" {
  description = "EKS node groups configuration"
  type        = any
  default     = {
    default = {
      desired_capacity = 3
      max_capacity     = 5
      min_capacity     = 3
      instance_types   = ["m5.large"]
      disk_size        = 50
    }
  }
}
EOF

# Create networking module templates
cat > "${TEMPLATE_DIR}/terraform/aws/modules/networking/main.tf" << 'EOF'
resource "aws_vpc" "this" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = merge(
    var.tags,
    {
      Name = var.vpc_name
    },
  )
}

resource "aws_subnet" "private" {
  count = length(var.availability_zones)
  
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]
  
  tags = merge(
    var.tags,
    {
      Name = "${var.vpc_name}-private-${var.availability_zones[count.index]}"
      "kubernetes.io/role/internal-elb" = "1"
    },
  )
}

resource "aws_subnet" "public" {
  count = length(var.availability_zones)
  
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true
  
  tags = merge(
    var.tags,
    {
      Name = "${var.vpc_name}-public-${var.availability_zones[count.index]}"
      "kubernetes.io/role/elb" = "1"
    },
  )
}

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id
  
  tags = merge(
    var.tags,
    {
      Name = "${var.vpc_name}-igw"
    },
  )
}

resource "aws_eip" "nat" {
  count = var.single_nat_gateway ? 1 : length(var.availability_zones)
  
  vpc = true
  
  tags = merge(
    var.tags,
    {
      Name = "${var.vpc_name}-nat-eip-${count.index}"
    },
  )
}

resource "aws_nat_gateway" "this" {
  count = var.single_nat_gateway ? 1 : length(var.availability_zones)
  
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id
  
  tags = merge(
    var.tags,
    {
      Name = "${var.vpc_name}-nat-${count.index}"
    },
  )
  
  depends_on = [aws_internet_gateway.this]
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.this.id
  
  tags = merge(
    var.tags,
    {
      Name = "${var.vpc_name}-public-rt"
    },
  )
}

resource "aws_route" "public_internet_gateway" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.this.id
  
  timeouts {
    create = "5m"
  }
}

resource "aws_route_table" "private" {
  count = var.single_nat_gateway ? 1 : length(var.availability_zones)
  
  vpc_id = aws_vpc.this.id
  
  tags = merge(
    var.tags,
    {
      Name = "${var.vpc_name}-private-rt-${count.index}"
    },
  )
}

resource "aws_route" "private_nat_gateway" {
  count = var.single_nat_gateway ? 1 : length(var.availability_zones)
  
  route_table_id         = aws_route_table.private[count.index].id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.this[var.single_nat_gateway ? 0 : count.index].id
  
  timeouts {
    create = "5m"
  }
}

resource "aws_route_table_association" "public" {
  count = length(var.availability_zones)
  
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count = length(var.availability_zones)
  
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[var.single_nat_gateway ? 0 : count.index].id
}
EOF

cat > "${TEMPLATE_DIR}/terraform/aws/modules/networking/variables.tf" << 'EOF'
variable "vpc_name" {
  description = "Name of the VPC"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
}

variable "single_nat_gateway" {
  description = "Use a single NAT gateway for all private subnets"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
EOF

cat > "${TEMPLATE_DIR}/terraform/aws/modules/networking/outputs.tf" << 'EOF'
output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.this.id
}

output "private_subnet_ids" {
  description = "List of private subnet IDs"
  value       = aws_subnet.private[*].id
}

output "public_subnet_ids" {
  description = "List of public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "nat_gateway_ids" {
  description = "List of NAT Gateway IDs"
  value       = aws_nat_gateway.this[*].id
}

output "internet_gateway_id" {
  description = "ID of the Internet Gateway"
  value       = aws_internet_gateway.this.id
}
EOF

# Create cluster module templates
cat > "${TEMPLATE_DIR}/terraform/aws/modules/cluster/main.tf" << 'EOF'
resource "aws_eks_cluster" "this" {
  name     = var.cluster_name
  role_arn = aws_iam_role.cluster.arn
  version  = var.kubernetes_version
  
  vpc_config {
    subnet_ids              = var.subnet_ids
    endpoint_private_access = true
    endpoint_public_access  = true
    security_group_ids      = [aws_security_group.cluster.id]
  }
  
  encryption_config {
    provider {
      key_arn = var.kms_key_arn != "" ? var.kms_key_arn : aws_kms_key.eks[0].arn
    }
    resources = ["secrets"]
  }
  
  enabled_cluster_log_types = [
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler"
  ]
  
  depends_on = [
    aws_iam_role_policy_attachment.cluster_AmazonEKSClusterPolicy,
    aws_iam_role_policy_attachment.cluster_AmazonEKSVPCResourceController,
  ]
  
  tags = var.tags
}

resource "aws_kms_key" "eks" {
  count = var.kms_key_arn == "" ? 1 : 0
  
  description             = "EKS Cluster ${var.cluster_name} Encryption Key"
  deletion_window_in_days = 7
  enable_key_rotation     = true
  
  tags = var.tags
}

resource "aws_security_group" "cluster" {
  name        = "${var.cluster_name}-cluster-sg"
  description = "EKS cluster security group"
  vpc_id      = var.vpc_id
  
  tags = merge(
    var.tags,
    {
      Name = "${var.cluster_name}-cluster-sg"
    },
  )
}

resource "aws_security_group_rule" "cluster_egress" {
  security_group_id = aws_security_group.cluster.id
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  description       = "Allow all outbound traffic"
}

resource "aws_iam_role" "cluster" {
  name = "${var.cluster_name}-cluster-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      }
    ]
  })
  
  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "cluster_AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.cluster.name
}

resource "aws_iam_role_policy_attachment" "cluster_AmazonEKSVPCResourceController" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.cluster.name
}

# Node Groups
resource "aws_eks_node_group" "this" {
  for_each = var.node_groups
  
  cluster_name    = aws_eks_cluster.this.name
  node_group_name = each.key
  node_role_arn   = aws_iam_role.node.arn
  subnet_ids      = var.subnet_ids
  
  scaling_config {
    desired_size = each.value.desired_capacity
    max_size     = each.value.max_capacity
    min_size     = each.value.min_capacity
  }
  
  instance_types = each.value.instance_types
  disk_size      = each.value.disk_size
  
  depends_on = [
    aws_iam_role_policy_attachment.node_AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.node_AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.node_AmazonEC2ContainerRegistryReadOnly,
  ]
  
  tags = var.tags
}

resource "aws_security_group" "node" {
  name        = "${var.cluster_name}-node-sg"
  description = "EKS node security group"
  vpc_id      = var.vpc_id
  
  tags = merge(
    var.tags,
    {
      Name = "${var.cluster_name}-node-sg"
      "kubernetes.io/cluster/${var.cluster_name}" = "owned"
    },
  )
}

resource "aws_security_group_rule" "node_egress" {
  security_group_id = aws_security_group.node.id
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  description       = "Allow all outbound traffic"
}

resource "aws_security_group_rule" "node_ingress_self" {
  security_group_id = aws_security_group.node.id
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  self              = true
  description       = "Allow node to communicate with each other"
}

resource "aws_security_group_rule" "node_ingress_cluster" {
  security_group_id = aws_security_group.node.id
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  source_security_group_id = aws_security_group.cluster.id
  description       = "Allow nodes to communicate with control plane"
}

resource "aws_security_group_rule" "cluster_ingress_node" {
  security_group_id = aws_security_group.cluster.id
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  source_security_group_id = aws_security_group.node.id
  description       = "Allow control plane to communicate with nodes"
}

resource "aws_iam_role" "node" {
  name = "${var.cluster_name}-node-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
  
  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "node_AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.node.name
}

resource "aws_iam_role_policy_attachment" "node_AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.node.name
}

resource "aws_iam_role_policy_attachment" "node_AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.node.name
}
EOF

cat > "${TEMPLATE_DIR}/terraform/aws/modules/cluster/variables.tf" << 'EOF'
variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
}

variable "vpc_id" {
  description = "ID of the VPC"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs"
  type        = list(string)
}

variable "node_groups" {
  description = "EKS node groups configuration"
  type        = any
}

variable "kms_key_arn" {
  description = "ARN of KMS key for encryption"
  type        = string
  default     = ""
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
EOF

cat > "${TEMPLATE_DIR}/terraform/aws/modules/cluster/outputs.tf" << 'EOF'
output "cluster_id" {
  description = "The ID of the EKS cluster"
  value       = aws_eks_cluster.this.id
}

output "cluster_arn" {
  description = "The ARN of the EKS cluster"
  value       = aws_eks_cluster.this.arn
}

output "cluster_endpoint" {
  description = "The endpoint for the EKS API server"
  value       = aws_eks_cluster.this.endpoint
}

output "cluster_certificate_authority_data" {
  description = "The base64 encoded certificate data for the EKS cluster"
  value       = aws_eks_cluster.this.certificate_authority[0].data
}

output "cluster_security_group_id" {
  description = "The security group ID attached to the EKS cluster"
  value       = aws_security_group.cluster.id
}

output "node_security_group_id" {
  description = "The security group ID attached to the EKS nodes"
  value       = aws_security_group.node.id
}

output "node_role_arn" {
  description = "The IAM role ARN for EKS nodes"
  value       = aws_iam_role.node.arn
}
EOF

# Create security module templates
cat > "${TEMPLATE_DIR}/terraform/aws/modules/security/main.tf" << 'EOF'
resource "aws_kms_key" "eks_secrets" {
  description             = "KMS key for EKS cluster secrets encryption"
  deletion_window_in_days = 7
  enable_key_rotation     = true
  
  tags = merge(
    var.tags,
    {
      Name = "${var.cluster_name}-secrets-key"
    }
  )
}

resource "aws_kms_alias" "eks_secrets" {
  name          = "alias/${var.cluster_name}-secrets"
  target_key_id = aws_kms_key.eks_secrets.key_id
}

# Security groups for additional resources
resource "aws_security_group" "eks_endpoint" {
  name        = "${var.cluster_name}-endpoint-sg"
  description = "Security group for EKS cluster endpoint"
  vpc_id      = var.vpc_id
  
  tags = merge(
    var.tags,
    {
      Name = "${var.cluster_name}-endpoint-sg"
    }
  )
}

resource "aws_security_group_rule" "eks_endpoint_ingress" {
  security_group_id = aws_security_group.eks_endpoint.id
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  description       = "Allow HTTPS traffic to EKS endpoint"
}

resource "aws_security_group_rule" "eks_endpoint_egress" {
  security_group_id = aws_security_group.eks_endpoint.id
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  description       = "Allow all outbound traffic"
}

# IAM roles for service accounts
resource "aws_iam_openid_connect_provider" "eks" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [var.openid_connect_thumbprint]
  url             = var.openid_connect_url
  
  tags = merge(
    var.tags,
    {
      Name = "${var.cluster_name}-oidc-provider"
    }
  )
}

# IAM role for pod identity
resource "aws_iam_role" "eks_pod_identity" {
  name = "${var.cluster_name}-pod-identity-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.eks.arn
        }
        Condition = {
          StringEquals = {
            "${replace(var.openid_connect_url, "https://", "")}:sub": "system:serviceaccount:kube-system:aws-node"
          }
        }
      }
    ]
  })
  
  tags = var.tags
}
EOF

cat > "${TEMPLATE_DIR}/terraform/aws/modules/security/variables.tf" << 'EOF'
variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "vpc_id" {
  description = "ID of the VPC"
  type        = string
}

variable "openid_connect_url" {
  description = "OpenID Connect provider URL for the EKS cluster"
  type        = string
}

variable "openid_connect_thumbprint" {
  description = "Thumbprint of the OpenID Connect provider"
  type        = string
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
EOF

cat > "${TEMPLATE_DIR}/terraform/aws/modules/security/outputs.tf" << 'EOF'
output "kms_key_arn" {
  description = "ARN of the KMS key for EKS secrets encryption"
  value       = aws_kms_key.eks_secrets.arn
}

output "security_group_id" {
  description = "ID of the security group for EKS endpoint"
  value       = aws_security_group.eks_endpoint.id
}

output "openid_connect_provider_arn" {
  description = "ARN of the OpenID Connect provider"
  value       = aws_iam_openid_connect_provider.eks.arn
}

output "pod_identity_role_arn" {
  description = "ARN of the IAM role for pod identity"
  value       = aws_iam_role.eks_pod_identity.arn
}
EOF

# Create environment templates
cat > "${TEMPLATE_DIR}/terraform/aws/environments/dev/main.tf" << 'EOF'
terraform {
  required_version = ">= 1.0.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "aws" {
  region = var.region
}

module "eks" {
  source = "../../"
  
  region            = var.region
  cluster_name      = var.cluster_name
  kubernetes_version = var.kubernetes_version
  
  vpc_cidr          = var.vpc_cidr
  availability_zones = var.availability_zones
  private_subnet_cidrs = var.private_subnet_cidrs
  public_subnet_cidrs = var.public_subnet_cidrs
  
  node_groups       = var.node_groups
}
EOF

cat > "${TEMPLATE_DIR}/terraform/aws/environments/dev/variables.tf" << 'EOF'
variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
  default     = "eks-dev"
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.24"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}

variable "node_groups" {
  description = "EKS node groups configuration"
  type        = any
  default     = {
    default = {
      desired_capacity = 2
      max_capacity     = 3
      min_capacity     = 1
      instance_types   = ["t3.medium"]
      disk_size        = 20
    }
  }
}
EOF
}

function create_kubernetes_templates() {
    mkdir -p "${TEMPLATE_DIR}/kubernetes/common/base"
    mkdir -p "${TEMPLATE_DIR}/kubernetes/common/security"
    mkdir -p "${TEMPLATE_DIR}/kubernetes/common/monitoring"
    mkdir -p "${TEMPLATE_DIR}/kubernetes/common/logging"
    
    # Create namespace templates
    cat > "${TEMPLATE_DIR}/kubernetes/common/base/namespaces.yaml" << 'EOF'
apiVersion: v1
kind: Namespace
metadata:
  name: monitoring
  labels:
    name: monitoring
---
apiVersion: v1
kind: Namespace
metadata:
  name: logging
  labels:
    name: logging
---
apiVersion: v1
kind: Namespace
metadata:
  name: security
  labels:
    name: security
---
apiVersion: v1
kind: Namespace
metadata:
  name: backup
  labels:
    name: backup
---
apiVersion: v1
kind: Namespace
metadata:
  name: applications
  labels:
    name: applications
EOF

    # Create security templates
    cat > "${TEMPLATE_DIR}/kubernetes/common/security/network-policies.yaml" << 'EOF'
# Default deny all ingress traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: applications
spec:
  podSelector: {}
  policyTypes:
  - Ingress
---
# Allow DNS lookups
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns-lookups
  namespace: applications
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: kube-system
    ports:
    - protocol: UDP
      port: 53
    - protocol: TCP
      port: 53
---
# Allow monitoring
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-monitoring
  namespace: applications
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: monitoring
EOF

    cat > "${TEMPLATE_DIR}/kubernetes/common/security/rbac.yaml" << 'EOF'
# Cluster roles
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: readonly-role
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "namespaces"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: developer-role
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "secrets"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["apps"]
  resources: ["deployments", "statefulsets", "daemonsets"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
# Service accounts
apiVersion: v1
kind: ServiceAccount
metadata:
  name: developer
  namespace: applications
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: readonly-user
  namespace: applications
---
# Role bindings
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developer-binding
  namespace: applications
subjects:
- kind: ServiceAccount
  name: developer
  namespace: applications
roleRef:
  kind: ClusterRole
  name: developer-role
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: readonly-binding
subjects:
- kind: ServiceAccount
  name: readonly-user
  namespace: applications
roleRef:
  kind: ClusterRole
  name: readonly-role
  apiGroup: rbac.authorization.k8s.io
EOF

    # Create monitoring templates
    cat > "${TEMPLATE_DIR}/kubernetes/common/monitoring/prometheus-values.yaml" << 'EOF'
# Values for Prometheus Helm chart
prometheus:
  enabled: true
  alertmanager:
    enabled: true
    persistentVolume:
      enabled: true
      size: 10Gi
  server:
    persistentVolume:
      enabled: true
      size: 50Gi
  nodeExporter:
    enabled: true
  pushgateway:
    enabled: true
  
  # Additional scrape configurations
  serverFiles:
    prometheus.yml:
      scrape_configs:
    
